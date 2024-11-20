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
    @GetMapping
    public ResponseEntity<UserResponseDto> getUserProfile(@RequestHeader("X-Member-ID") String memberId) {
        if (memberId == null || memberId.isEmpty()) {
            throw new IllegalArgumentException("X-Member-ID header is required");
        }
        Long userId = Long.valueOf(memberId);
        UserResponseDto userProfile = userService.getUserProfile(userId);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }

    @Operation(summary = "유저 프로필 조회2")
    @GetMapping("/{userId}")
    public ResponseEntity<UserResponseDto> getUserProfileNickName(@PathVariable("userId") Long userId) {
        UserResponseDto userProfile = userService.getUserProfile(userId);
        return new ResponseEntity<>(userProfile, HttpStatus.OK);
    }

    @Operation(summary = "유저 프로필 업데이트")
    @PatchMapping
    public ResponseEntity<Void> updateUserProfile(@RequestHeader("X-Member-ID") String memberId, @ModelAttribute UserProfileRequestDto requestDto) {
        if (memberId == null || memberId.isEmpty()) {
            throw new IllegalArgumentException("X-Member-ID header is required");
        }
        Long userId = Long.valueOf(memberId);
        userService.updateUserProfile(userId, requestDto);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "응원 팀 업데이트")
    @PatchMapping("/favorite-team")
    public ResponseEntity<Void> updateFavoriteTeam(@RequestHeader("X-Member-ID") String memberId, @RequestParam Integer teamId) {
        if (memberId == null || memberId.isEmpty()) {
            throw new IllegalArgumentException("X-Member-ID header is required");
        }
        Long userId = Long.valueOf(memberId);
        userService.updateFavoriteTeam(userId, teamId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }

    @Operation(summary = "응원 팀 조회")
    @GetMapping("/favorite-team")
    public ResponseEntity<Integer> getFavoriteTeam(@RequestHeader("X-Member-ID") String memberId) {
        if (memberId == null || memberId.isEmpty()) {
            throw new IllegalArgumentException("X-Member-ID header is required");
        }
        Long userId = Long.valueOf(memberId);
        return new ResponseEntity<>(userService.getFavoriteTeam(userId), HttpStatus.OK);
    }

    @Operation(summary = "회원 탈퇴 처리")
    @PatchMapping("/resign")
    public ResponseEntity<Void> resignUser(@RequestHeader("X-Member-ID") String memberId) {
        if (memberId == null || memberId.isEmpty()) {
            throw new IllegalArgumentException("X-Member-ID header is required");
        }
        Long userId = Long.valueOf(memberId);
        userService.updateIsResigned(userId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
