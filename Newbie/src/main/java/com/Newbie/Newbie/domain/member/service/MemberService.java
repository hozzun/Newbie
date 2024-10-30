package com.Newbie.Newbie.domain.member.service;

import com.Newbie.Newbie.domain.member.dto.request.MemberLoginRequestDto;
import com.Newbie.Newbie.domain.member.dto.response.MemberLoginResponseDto;
import com.fasterxml.jackson.core.JsonProcessingException;

public interface MemberService {

    MemberLoginResponseDto login(MemberLoginRequestDto memberLoginRequestDto);

    String kakaoLogin(String code) throws JsonProcessingException;
}
