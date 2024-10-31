package com.newbie.auth.domain.member.dto.request;

import lombok.Data;

@Data
public class MemberRegisterRequestDto {

    private String nickname;
    private String address;

}
