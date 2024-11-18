package com.newbie.chat.domain.chatroom.service;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.core.ListOperations;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

import java.time.Duration;
import java.util.*;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class ChatServiceImpl implements ChatService {

    private final RedisTemplate<String, Object> redisTemplate;
    private final RedisTemplate<String, String> stringRedisTemplate;
    private final ObjectMapper objectMapper;

    private static final String CHAT_KEY_PREFIX = "chatroom:";
    private static final String PARTICIPANT_KEY_PREFIX = "chatroom:participants:";
    private static final Duration MESSAGE_TTL = Duration.ofDays(3); // 메시지 보존 기간 설정

    @Override
    public void saveMessage(String roomId, ChatMessage message) {
        try {
            String key = CHAT_KEY_PREFIX + roomId;
            ListOperations<String, Object> listOps = redisTemplate.opsForList();

            // 메시지 저장 (리스트에 오른쪽에 추가)
            listOps.rightPush(key, message);

            // Redis에서 메시지 개수 확인
            Long listSize = listOps.size(key);

            // 100개 초과시 가장 오래된 메시지 삭제
            if (listSize != null && listSize > 100) {
                listOps.leftPop(key); // 왼쪽에서 가장 오래된 메시지 삭제
            }

            // TTL 설정
            redisTemplate.expire(key, MESSAGE_TTL);

            // Redis Pub/Sub 채널에 메시지 발행
            redisTemplate.convertAndSend("chatroom:" + roomId, message);
        } catch (Exception e) {
            log.error("Error saving message to Redis: {}", e.getMessage());
            throw new RuntimeException("Message save failed");
        }
    }

    @Override
    public List<ChatMessage> getMessages(String roomId) {
        String key = CHAT_KEY_PREFIX + roomId;
        ListOperations<String, Object> listOps = redisTemplate.opsForList();
        List<Object> rawMessages = listOps.range(key, 0, -1);

        if (rawMessages == null) {
            return Collections.emptyList();
        }

        // ObjectMapper를 사용하여 Object를 ChatMessage로 변환
        return rawMessages.stream()
                .map(obj -> objectMapper.convertValue(obj, ChatMessage.class))
                .filter(Objects::nonNull)
                .collect(Collectors.toList());
    }

    // 기존 채팅기록 보이는 ver
//    @Override
//    public List<ChatMessage> getMessages(String roomId) {
//        String key = CHAT_KEY_PREFIX + roomId;
//        ListOperations<String, Object> listOps = redisTemplate.opsForList();
//
//        // Redis에서 메시지 가져오기
//        List<Object> rawMessages = listOps.range(key, -100, -1);
//
//        if (rawMessages == null || rawMessages.isEmpty()) {
//            return Collections.emptyList();
//        }
//
//        // 메시지를 ChatMessage로 변환하고, timestamp 기준으로 정렬
//        return rawMessages.stream()
//                .map(obj -> objectMapper.convertValue(obj, ChatMessage.class))
//                .filter(Objects::nonNull)
//                .sorted(Comparator.comparing(ChatMessage::getTimestamp)) // 메시지 시간 순으로 정렬
//                .collect(Collectors.toList());
//    }

    @Override
    public void addParticipant(String roomId, String userName) {
        String key = PARTICIPANT_KEY_PREFIX + roomId;
        stringRedisTemplate.opsForSet().add(key, userName);
    }

    @Override
    public void removeParticipant(String roomId, String userName) {
        String key = PARTICIPANT_KEY_PREFIX + roomId;
        stringRedisTemplate.opsForSet().remove(key, userName);
    }

    @Override
    public Set<String> getParticipants(String roomId) {
        String key = PARTICIPANT_KEY_PREFIX + roomId;
        Set<String> participants = stringRedisTemplate.opsForSet().members(key);
        return participants != null ? participants : Collections.emptySet();
    }

    @Override
    public int getParticipantCount(String roomId) {
        String key = PARTICIPANT_KEY_PREFIX + roomId;
        Long count = stringRedisTemplate.opsForSet().size(key);
        return count != null ? count.intValue() : 0;
    }

    @Override
    public List<String> getAllRoomIds() {
        // Redis에 저장된 모든 채팅방의 키를 검색하여 방 ID를 추출합니다.
        Set<String> keys = redisTemplate.keys(CHAT_KEY_PREFIX + "*");
        if (keys == null) {
            return Collections.emptyList();
        }
        return keys.stream()
                .map(key -> key.substring(CHAT_KEY_PREFIX.length()))
                .collect(Collectors.toList());
    }
}
