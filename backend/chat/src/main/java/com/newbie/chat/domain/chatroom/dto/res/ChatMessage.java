package com.newbie.chat.domain.chatroom.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class ChatMessage {

    private String roomId;
    private String sender;
    private String message;
    private MessageType type;

    public enum MessageType {
        CHAT, JOIN, LEAVE
    }
}
