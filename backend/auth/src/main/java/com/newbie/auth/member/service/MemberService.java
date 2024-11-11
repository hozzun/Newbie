package com.newbie.auth.member.service;

import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;

public interface MemberService {

    String signUp(MemberSignUpRequestDto dto);
    void resignMember(Long memberId);
}
