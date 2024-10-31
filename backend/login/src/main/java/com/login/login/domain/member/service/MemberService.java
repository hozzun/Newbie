package com.login.login.domain.member.service;

import com.login.login.domain.member.dto.request.MemberLoginRequestDto;
import com.login.login.domain.member.dto.response.MemberLoginResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface MemberService {

    MemberLoginResponseDto login(MemberLoginRequestDto memberLoginRequestDto);

    String kakaoLogin(String code) throws JsonProcessingException;
}
