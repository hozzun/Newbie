package com.newbie.auth.member.dto.request;

import com.newbie.auth.member.dto.MemberImageDto;
import lombok.Data;

@Data
public class MemberUpdateRequestDto {
    private String nickname;
    private String address;
    private MemberImageDto memberImage;
}
