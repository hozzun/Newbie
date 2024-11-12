package com.newbie.chat.global.util;

import com.fasterxml.jackson.databind.ObjectMapper;
import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.redis.connection.Message;
import org.springframework.data.redis.connection.MessageListener;
import org.springframework.messaging.simp.*;
import org.springframework.stereotype.Service;

@Slf4j
@Service
@RequiredArgsConstructor
public class RedisSubscriber implements MessageListener {

    private final ObjectMapper objectMapper;
    private final SimpMessagingTemplate messagingTemplate;

    @Override
    public void onMessage(Message message, byte[] pattern) {
        try {
            String channel = new String(message.getChannel());
            String roomId = channel.substring("chatroom:".length());
            ChatMessage chatMessage = objectMapper.readValue(message.getBody(), ChatMessage.class);
            messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, chatMessage);
        } catch (Exception e) {
            log.error("Error occurred while processing Redis message: {}", e.getMessage(), e);
        }
    }
}