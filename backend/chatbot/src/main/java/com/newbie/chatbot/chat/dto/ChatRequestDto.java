package com.newbie.chatbot.chat.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ChatRequestDto {

    private int userId;
    private String message;
    private long timestamp;
}
