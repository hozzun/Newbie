package com.newbie.chatbot.chat.controller;

import com.newbie.chatbot.chat.dto.ChatRequestDto;
import com.newbie.chatbot.chat.dto.MessageDto;
import com.newbie.chatbot.chat.service.ChatRoomService;
import com.newbie.chatbot.chat.service.OpenAIService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.handler.annotation.DestinationVariable;
import org.springframework.messaging.handler.annotation.MessageMapping;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Slf4j
public class ChatController {

    private final ChatRoomService chatRoomService;
    private final OpenAIService aiService;
    private final SimpMessagingTemplate messagingTemplate;

    @PostMapping("/create-room")
    public String createRoom(@RequestParam int userId) {
        return chatRoomService.getOrCreateRoom(userId);
    }

    @MessageMapping("/chatbot/{roomId}")
    public MessageDto handleMessage(ChatRequestDto chatRequestDto, @DestinationVariable String roomId) {
        chatRoomService.saveMessage(roomId, chatRequestDto);

        return aiService.generateAnswer(chatRequestDto.getMessage(), roomId);
    }

    @GetMapping("/chatbot/{roomId}/history")
    public List<ChatRequestDto> getMessageHistory(@PathVariable String roomId) {
        log.info("Get message history for room: {}", roomId);
        return chatRoomService.getMessages(roomId);
    }
}
