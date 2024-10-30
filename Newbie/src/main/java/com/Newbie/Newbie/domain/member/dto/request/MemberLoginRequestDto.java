package com.Newbie.Newbie.domain.member.dto.request;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class MemberLoginRequestDto {

    private String kakaoAccessToken;
}
