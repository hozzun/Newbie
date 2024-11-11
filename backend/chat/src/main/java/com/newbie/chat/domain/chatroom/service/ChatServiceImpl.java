package com.newbie.chat.domain.chatroom.service;

import com.newbie.chat.domain.chatroom.dto.res.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Set;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final RedisTemplate<String, Object> redisTemplate;

    @Override
    public void saveMessage(String roomId, ChatMessage message) {
        try {
            redisTemplate.opsForList().rightPush("chatroom:" + roomId, message);
        } catch (Exception e) {
            log.error("Redis에 메시지를 저장하는 중 오류 발생: {}", e.getMessage());
            throw new RuntimeException("메시지 저장 실패");
        }
    }

    @Override
    public List<Object> getMessages(String roomId) {
        Long size = redisTemplate.opsForList().size("chatroom:" + roomId);
        if (size != null && size > 0) {
            return redisTemplate.opsForList().range("chatroom:" + roomId, 0, size - 1);
        } else {
            return new ArrayList<>();
        }
    }

    @Override
    public List<String> getAllRoomIds() {
        Set<String> roomKeys = redisTemplate.keys("chatroom:*");
        if (roomKeys != null) {
            return new ArrayList<>(roomKeys);
        } else {
            return new ArrayList<>();
        }
    }
}
