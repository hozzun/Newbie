package com.Newbie.Newbie.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberLogoutRequestDto {
    private String refreshToken;
    private String accessToken;
}
