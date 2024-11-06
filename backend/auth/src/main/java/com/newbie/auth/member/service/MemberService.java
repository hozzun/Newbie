package com.newbie.auth.member.service;

import com.newbie.auth.member.dto.request.MemberFavoriteTeamUpdateRequestDto;
import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;

public interface MemberService {
    String signUp(MemberSignUpRequestDto dto);
    void saveFavoriteTeam(MemberFavoriteTeamUpdateRequestDto dto);
}
