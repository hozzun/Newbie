package com.login.login.domain.member.dto.response;

import lombok.Data;

@Data
public class MemberLoginResponseDto {

    private String accessToken;
    private String refreshToken;
}
