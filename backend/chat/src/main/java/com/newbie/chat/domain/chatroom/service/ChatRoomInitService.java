package com.newbie.chat.domain.chatroom.service;

import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import jakarta.annotation.PostConstruct;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
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
                // 시스템 메시지 생성
                ChatMessage systemMessage = new ChatMessage();
                systemMessage.setRoomId(teamName);
                systemMessage.setSender("System");
                systemMessage.setMessage("채팅방이 생성되었습니다.");
                systemMessage.setTimestamp(LocalDateTime.now());
                systemMessage.setType(ChatMessage.MessageType.SYSTEM);

                // 시스템 메시지를 Redis에 저장
                redisTemplate.opsForList().rightPush(roomId, systemMessage);
            }
        });
    }
}
