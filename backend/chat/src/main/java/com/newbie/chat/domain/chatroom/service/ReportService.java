package com.newbie.chat.domain.chatroom.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class ReportService {

    private final RedisTemplate<String, Object> redisTemplate;
    private static final String REPORT_COUNT_KEY_PREFIX = "user:report:";
    private static final String BAN_INFO_KEY_PREFIX = "user:ban:";
    private static final String USER_REPORTS_KEY_PREFIX = "user:reports:"; // 신고한 유저 목록

    // 신고 횟수 증가 및 중복 신고 방지
    public boolean incrementReportCount(String reporterUserEmail, String reportedUserEmail) {
        String userReportsKey = USER_REPORTS_KEY_PREFIX + reporterUserEmail;
        Long added = redisTemplate.opsForSet().add(userReportsKey, reportedUserEmail);

        boolean isAdded = (added != null && added > 0);

        if (!isAdded) {
            // 이미 신고한 유저인 경우
            return false;
        }

        // 신고 횟수 증가
        String reportCountKey = REPORT_COUNT_KEY_PREFIX + reportedUserEmail;
        Long count = redisTemplate.opsForValue().increment(reportCountKey);
        if (count == null) {
            count = 1L;
        }

        if (count >= 3) {
            banUser(reportedUserEmail);
            redisTemplate.delete(reportCountKey); // 신고 횟수 초기화
            redisTemplate.delete(userReportsKey); // 신고한 유저 목록 초기화
        } else {
            // 신고한 유저 목록 유지 시간 설정 (선택 사항)
            redisTemplate.expire(userReportsKey, Duration.ofDays(3));
        }

        return true;
    }

    // 사용자 차단
    public void banUser(String userEmail) {
        String key = BAN_INFO_KEY_PREFIX + userEmail;
        LocalDateTime banUntil = LocalDateTime.now().plusDays(3);
        redisTemplate.opsForValue().set(key, banUntil.toString());
        // 차단 정보의 TTL 설정
        redisTemplate.expire(key, Duration.ofDays(3));
    }

    // 사용자 차단 여부 확인
    public boolean isUserBanned(String userEmail) {
        String key = BAN_INFO_KEY_PREFIX + userEmail;
        String banUntilStr = (String) redisTemplate.opsForValue().get(key);
        if (banUntilStr != null) {
            LocalDateTime banUntil = LocalDateTime.parse(banUntilStr);
            if (LocalDateTime.now().isBefore(banUntil)) {
                return true;
            } else {
                redisTemplate.delete(key);
            }
        }
        return false;
    }

    // 차단 만료 시간 조회
    public LocalDateTime getBanExpiry(String userEmail) {
        String key = BAN_INFO_KEY_PREFIX + userEmail;
        String banUntilStr = (String) redisTemplate.opsForValue().get(key);
        if (banUntilStr != null) {
            return LocalDateTime.parse(banUntilStr);
        }
        return null;
    }
}
