package com.newbie.board.generalBoard.controller;

import com.newbie.board.generalBoard.service.GeneralBoardLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@RequestMapping("/general-board")
public class BoardLikeController {

    private final GeneralBoardLikeService likeService;

    @Operation(summary = "좋아요 토글", description = "유저가 게시글에 좋아요를 추가하거나 취소합니다.")
    @PostMapping("/{boardId}/like")
    public ResponseEntity<String> toggleLike(
            @PathVariable @Parameter(description = "게시글 ID") Long boardId,
            @RequestHeader("X-Member-ID") String userId) {
        String result = likeService.toggleLike(userId, boardId);
        return ResponseEntity.status(HttpStatus.OK).body(result);
    }

    @Operation(summary = "좋아요 개수 조회", description = "특정 게시글의 좋아요 개수를 조회합니다.")
    @GetMapping("/{boardId}/likes")
    public ResponseEntity<Integer> getLikeCount(
            @PathVariable @Parameter(description = "게시글 ID") Long boardId) {
        int count = likeService.getLikeCount(boardId);
        return ResponseEntity.status(HttpStatus.OK).body(count);
    }
}
