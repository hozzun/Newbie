package com.newbie.auth.member.controller;

import com.newbie.auth.global.dto.SuccessResponse;
import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;
import com.newbie.auth.member.service.MemberService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RequiredArgsConstructor
@RequestMapping("/members")
@RestController
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/signup")
    @Operation(summary = "회원가입", description = "회원가입 할 때 사용하는 API")
    public SuccessResponse<?> signUp(@RequestBody MemberSignUpRequestDto memberSignUpRequestDto) {
        return SuccessResponse.created(memberService.signUp(memberSignUpRequestDto));
    }

    @DeleteMapping("/{memberId}")
    @Operation(summary = "회원 탈퇴")
    public ResponseEntity<Void> resignMember(@PathVariable Long memberId) {
        memberService.resignMember(memberId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}