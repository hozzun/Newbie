package com.newbie.chat.domain.chatroom.service;

import com.newbie.chat.domain.chatroom.dto.ChatMessage;

import java.util.List;
import java.util.Set;

public interface ChatService {

    void saveMessage(String roomId, ChatMessage message);

    List<ChatMessage> getMessages(String roomId);

    void addParticipant(String roomId, String userEmail);

    void removeParticipant(String roomId, String userEmail);

    Set<String> getParticipants(String roomId);

    int getParticipantCount(String roomId);

    List<String> getAllRoomIds();
}