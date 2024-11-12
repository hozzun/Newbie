package com.newbie.chat.domain.chatroom.controller;

import com.newbie.chat.domain.chatroom.dto.res.ChatMessage;
import com.newbie.chat.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.web.bind.annotation.RestController;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    // private final SimpMessagingTemplate messagingTemplate; // 제거

    @MessageMapping("/chat/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable String roomId, ChatMessage message) {
        message.setRoomId(roomId);
        log.info("Message received in sendMessage: {}", message);
        chatService.saveMessage(roomId, message);
        // messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message); // 제거
    }

    @MessageMapping("/chat/{roomId}/join")
    public void joinRoom(@DestinationVariable String roomId, ChatMessage message) {
        message.setRoomId(roomId);
        message.setType(ChatMessage.MessageType.JOIN);
        message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        log.info("Join message received in joinRoom: {}", message);
        chatService.saveMessage(roomId, message);
        // messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message); // 제거
    }

    @MessageMapping("/chat/{roomId}/leave")
    public void leaveRoom(@DestinationVariable String roomId, ChatMessage message) {
        message.setRoomId(roomId);
        message.setType(ChatMessage.MessageType.LEAVE);
        message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
        log.info("Leave message received in leaveRoom: {}", message);
        chatService.saveMessage(roomId, message);
        // messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, message); // 제거
    }
}
