package com.newbie.chatbot.chat.service;

import com.newbie.chatbot.chat.dto.ChatRequestDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.UUID;

@Service
@Slf4j
@RequiredArgsConstructor
public class ChatRoomService {

    private final RedisTemplate<String, Object> redisTemplate;

    public String getOrCreateRoom(String memberId) {
        Long userId = Long.valueOf(memberId);
        String roomId = (String) redisTemplate.opsForValue().get("user:room:" + userId);

        if (roomId == null) {
            log.info("Create new room for user: {}", userId);
            roomId = UUID.randomUUID().toString();
            redisTemplate.opsForValue().set("user:room:" + userId, roomId);
        }
        log.info("User {} joined room: {}", userId, roomId);
        return roomId;
    }

    // 채팅 메시지 저장
    public void saveMessage(String roomId, ChatRequestDto message) {
        if (message.getTimestamp() == 0) {
            message.setTimestamp(System.currentTimeMillis()); // 현재 시간 추가
        }
        redisTemplate.opsForList().rightPush("chat:" + roomId, message);
        log.info("Saved message in room {}: {}", roomId, message);
    }

    // 채팅 메시지 내역 조회
    public List<ChatRequestDto> getMessages(String roomId) {
        List<Object> messageObjects = redisTemplate.opsForList().range("chat:" + roomId, 0, -1);
        log.info("Get messages from room: {}", roomId, messageObjects);
        return messageObjects.stream()
                .filter(ChatRequestDto.class::isInstance)
                .map(ChatRequestDto.class::cast)
                .toList();
    }

    public String getRoomIdByUserId(String userId) {
        return (String) redisTemplate.opsForValue().get("user:room:" + userId);
    }
}

