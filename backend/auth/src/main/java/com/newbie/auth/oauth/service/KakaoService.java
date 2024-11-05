package com.newbie.auth.oauth.service;


import com.newbie.auth.oauth.dto.KakaoMemberResponseDto;

public interface KakaoService {
    KakaoMemberResponseDto getKakaoUser(String code);
}
