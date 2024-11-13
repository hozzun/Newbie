package com.newbie.user.domain.user.controller;

import com.newbie.user.domain.user.dto.req.UserProfileRequestDto;
import com.newbie.user.domain.user.dto.req.UserRequestDto;
import com.newbie.user.domain.user.dto.res.UserResponseDto;
import com.newbie.user.domain.user.service.UserService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RequiredArgsConstructor
@RestController
@Tag(name = "유저정보 API")
@RequestMapping("/users")
public class UserController {

    private final UserService userService;

    @Hidden
    @Operation(summary = "회원 정보 저장")
    @PostMapping
    public ResponseEntity<Void> saveUserProfile(@RequestBody UserRequestDto requestDto) {
        userService.saveUserProfile(requestDto);
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @Operation(summary = "유저 프로필 조회")
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUserProfile(@PathVariable Long userId) {
        UserResponseDto userProfile = userService.getUserProfile(userId);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }

    @Operation(summary = "유저 프로필 업데이트")
    @PatchMapping("/{userId}")
    public ResponseEntity<Void> updateUserProfile(@PathVariable Long userId, @ModelAttribute UserProfileRequestDto requestDto) {
        userService.updateUserProfile(userId, requestDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "응원 팀 업데이트")
    @PatchMapping("/{userId}/favorite-team")
    public ResponseEntity<Void> updateFavoriteTeam(@PathVariable Long userId, @RequestParam Integer teamId) {
        userService.updateFavoriteTeam(userId, teamId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "응원 팀 조회")
    @GetMapping("/{userId}/favorite-team")
    public ResponseEntity<Integer> getFavoriteTeam(@PathVariable Long userId) {
        return new ResponseEntity<>(userService.getFavoriteTeam(userId), HttpStatus.OK);
    }
}
