package com.newbie.chat.domain.chatroom.controller;

import com.newbie.chat.domain.chatroom.dto.res.ChatMessage;
import com.newbie.chat.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.messaging.handler.annotation.SendTo;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;

    @MessageMapping("/chat/sendMessage")
    @SendTo("/topic/chatroom/{roomId}")
    public void sendMessage(ChatMessage message) {
        chatService.saveMessage(message.getRoomId(), message);
    }

    @MessageMapping("/chat/join")
    @SendTo("/topic/chatroom/{roomId}")
    public ChatMessage joinRoom(ChatMessage message) {
        message.setType(ChatMessage.MessageType.JOIN);
        message.setMessage(message.getSender() + "님이 입장하셨습니다.");
        chatService.saveMessage(message.getRoomId(), message);
        return message;
    }

    @MessageMapping("/chat/leave")
    @SendTo("/topic/chatroom/{roomId}")
    public ChatMessage leaveRoom(ChatMessage message) {
        message.setType(ChatMessage.MessageType.LEAVE);
        message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
        chatService.saveMessage(message.getRoomId(), message);
        return message;
    }
}
