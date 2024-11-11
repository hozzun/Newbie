package com.newbie.chat.domain.chatroom.controller;

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

    @GetMapping("/rooms")
    public List<String> getAllRooms() {
        return chatService.getAllRoomIds();
    }

    @GetMapping("/rooms/{roomId}")
    public List<Object> getMessages(@PathVariable String roomId) {
        return chatService.getMessages(roomId);
    }
}
