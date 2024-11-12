package com.newbie.chat.domain.chatroom.controller;

import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import com.newbie.chat.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@RequestMapping("/api/chat")
public class ChatRoomController {

    private final ChatService chatService;

    // 모든 채팅방의 ID를 반환 (필요에 따라 구현)
    @GetMapping("/rooms")
    public List<String> getAllRooms() {
        return chatService.getAllRoomIds();
    }

    // 특정 채팅방의 메시지 목록을 반환
    @GetMapping("/rooms/{roomId}/messages")
    public List<ChatMessage> getMessages(@PathVariable String roomId) {
        return chatService.getMessages(roomId);
    }
}
