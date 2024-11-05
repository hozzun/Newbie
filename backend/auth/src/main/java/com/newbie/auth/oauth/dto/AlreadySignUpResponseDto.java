package com.newbie.auth.oauth.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
public class AlreadySignUpResponseDto {
    private int status;
    private String message;
    private String token;
    private LocalDateTime timestamp;
}
