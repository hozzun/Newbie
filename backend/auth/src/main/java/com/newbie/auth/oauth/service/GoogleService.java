package com.newbie.auth.oauth.service;

import com.newbie.auth.oauth.dto.GoogleMemberResponseDto;

public interface GoogleService {
    GoogleMemberResponseDto getGoogleUser(String email);
}
