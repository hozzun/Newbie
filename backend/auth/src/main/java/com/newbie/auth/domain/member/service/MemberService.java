package com.newbie.auth.domain.member.service;

import com.newbie.auth.domain.member.dto.request.MemberLoginRequestDto;
import com.newbie.auth.domain.member.dto.request.MemberRegisterRequestDto;
import com.newbie.auth.domain.member.dto.response.MemberLoginResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface MemberService {

    MemberLoginResponseDto login(MemberLoginRequestDto memberLoginRequestDto);

    String kakaoLogin(String code) throws JsonProcessingException;

    void register(MemberRegisterRequestDto memberRegisterRequestDto);
}
