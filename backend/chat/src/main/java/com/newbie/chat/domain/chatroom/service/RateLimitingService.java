package com.newbie.chat.domain.chatroom.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.StringRedisTemplate;
import org.springframework.stereotype.Service;

import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
public class RateLimitingService {

    private final StringRedisTemplate stringRedisTemplate;

    private static final int MAX_MESSAGES = 10;
    private static final long TIME_WINDOW = 10; // 초 단위
    private static final long BLOCK_TIME = 60; // 1분 차단 (초 단위)

    public boolean isAllowed(String userId) {
        String key = "rate_limit:" + userId;

        if (isBlocked(userId)) {
            return false;
        }

        Long count = stringRedisTemplate.opsForValue().increment(key);
        if (count == null || count == 1) {
            // 키의 만료 시간 설정
            stringRedisTemplate.expire(key, TIME_WINDOW, TimeUnit.SECONDS);
        }

        if (count != null && count > MAX_MESSAGES) {
            // 사용자 차단
            blockUser(userId);
            return false;
        }

        return true;
    }

    public void blockUser(String userId) {
        String blockKey = "blocked_user:" + userId;
        stringRedisTemplate.opsForValue().set(blockKey, "blocked", BLOCK_TIME, TimeUnit.SECONDS);
    }

    public boolean isBlocked(String userId) {
        String blockKey = "blocked_user:" + userId;
        Boolean isBlocked = stringRedisTemplate.hasKey(blockKey);
        return isBlocked != null && isBlocked;
    }
}
