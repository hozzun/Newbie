package com.newbie.board.mypage.controller;


import com.newbie.board.mypage.dto.MyPageBoardResponseDto;
import com.newbie.board.mypage.service.MyPageService;
import io.swagger.v3.oas.annotations.Operation;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
@RequestMapping("/mypage")
public class MyPageController {

    private final MyPageService myPageService;

    @Operation(summary = "마이페이지 나의 게시글 목록 확인", description = "나의 게시글 목록을 확인합니다.")
    @GetMapping("/board")
    public ResponseEntity<MyPageBoardResponseDto> getMyPageBoardList(Long userId) {
        return ResponseEntity.ok(myPageService.getMyPageBoardList(userId));
    }
}
