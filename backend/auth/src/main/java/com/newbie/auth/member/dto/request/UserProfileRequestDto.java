package com.newbie.auth.member.dto.request;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Builder
@Data
@AllArgsConstructor
public class UserProfileRequestDto {

    private Long userId;
    private String email;
    private String nickname;
    private String address;
}
