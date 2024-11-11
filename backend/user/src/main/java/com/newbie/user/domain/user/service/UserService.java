package com.newbie.user.domain.user.service;

import com.newbie.user.domain.user.dto.req.UserProfileRequestDto;
import com.newbie.user.domain.user.dto.req.UserRequestDto;
import com.newbie.user.domain.user.dto.res.UserResponseDto;
import org.springframework.web.multipart.MultipartFile;

public interface UserService {

    UserResponseDto getUserProfile(Long userId);
    void saveUserProfile(UserRequestDto requestDto);
    void updateUserProfile(Long userId, UserProfileRequestDto userProfileRequestDto);
    void updateFavoriteTeam(Long userId, Integer teamId);
}
