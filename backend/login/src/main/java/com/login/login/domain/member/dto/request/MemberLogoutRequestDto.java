package com.login.login.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberLogoutRequestDto {
    private String refreshToken;
    private String accessToken;
}
