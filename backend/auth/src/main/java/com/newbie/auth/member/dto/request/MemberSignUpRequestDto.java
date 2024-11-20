package com.newbie.auth.member.dto.request;

import com.newbie.auth.member.domain.Platform;
import lombok.NoArgsConstructor;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class MemberSignUpRequestDto {

    private String email;
    private String nickname;
    private String address;
    private Platform platform;
}