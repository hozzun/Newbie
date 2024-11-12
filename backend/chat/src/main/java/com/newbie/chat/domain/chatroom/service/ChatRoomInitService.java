package com.newbie.chat.domain.chatroom.service;

import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class ChatRoomInitService {

    private final RedisTemplate<String, Object> redisTemplate;

    private static final List<String> TEAM_NAMES = List.of("hanwha", "kia", "samsung", "lg", "doosan", "lotte", "kt", "nc", "ssg", "kiwoom");

    @PostConstruct
    public void initializeChatRooms() {
        TEAM_NAMES.forEach(teamName -> {
            String roomId = "chatroom:" + teamName;
            if (!Boolean.TRUE.equals(redisTemplate.hasKey(roomId))) {
                redisTemplate.opsForList().rightPush(roomId, "채팅방이 생성되었습니다.");
            }
        });
    }
}
