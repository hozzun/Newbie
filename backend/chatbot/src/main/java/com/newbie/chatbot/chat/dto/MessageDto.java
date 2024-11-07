package com.newbie.chatbot.chat.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class MessageDto {

    private String content;
    private String sender;
    private String roomId;
    private long timestamp;

    // 필요한 필드만 포함하는 생성자
    public MessageDto(String content, String sender) {
        this.content = content;
        this.sender = sender;
    }
}