package com.newbie.chat.domain.chatroom.service;

import com.newbie.chat.domain.chatroom.dto.res.ChatMessage;

import java.util.List;

public interface ChatService {

    void saveMessage(String roomId, ChatMessage message);
    List<Object> getMessages(String roomId);
    List<String> getAllRoomIds();
}
