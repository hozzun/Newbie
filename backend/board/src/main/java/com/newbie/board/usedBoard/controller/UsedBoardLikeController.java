package com.newbie.board.usedBoard.controller;


import com.newbie.board.usedBoard.service.UsedBoardLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/used-board/like")
@RequiredArgsConstructor
public class UsedBoardLikeController {

    private final UsedBoardLikeService usedBoardLikeService;

    /**
     * 게시글에 대한 좋아요 상태를 토글합니다.
     * 좋아요가 없는 경우 추가하고, 있는 경우 삭제합니다.
     *
     * @param userId  사용자 ID
     * @param boardId 게시글 ID
     * @return 좋아요 상태("liked" 또는 "unliked")
     */
    @Operation(summary = "좋아요 토글", description = "게시글에 대한 좋아요 상태를 토글합니다.")
    @PostMapping("/{boardId}")
    public ResponseEntity<String> toggleLike(
            @RequestParam @Parameter(description = "사용자 ID") Long userId,
            @PathVariable @Parameter(description = "게시글 ID") Long boardId) {

        String result = usedBoardLikeService.toggleLike(userId, boardId);
        return ResponseEntity.ok(result);
    }
}
