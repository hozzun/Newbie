package com.newbie.auth.member.dto.request;

import com.newbie.auth.member.domain.Platform;
import com.newbie.auth.member.dto.MemberImageDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class MemberSignUpRequestDto {
    private String nickname;
    private String email;
    private String address;
    private Platform platform;
    private MemberImageDto memberImage;
}
