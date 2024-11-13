package com.newbie.board.generalBoard.controller;

import com.newbie.board.generalBoard.dto.GeneralBoardCommentRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardCommentResponseDto;
import com.newbie.board.generalBoard.service.GeneralBoardCommentService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/general-comment")
@RequiredArgsConstructor
public class GeneralBoardCommentController {

    private final GeneralBoardCommentService commentService;

    @Operation(summary = "게시글 댓글 조회", description = "게시글에 대한 댓글을 조회합니다.")
    @GetMapping("/{boardId}")
    public ResponseEntity<List<GeneralBoardCommentResponseDto>> getComments(@PathVariable @Parameter(description = "boardId") Long boardId) {
        return ResponseEntity.ok(commentService.getCommentList(boardId));
    }

    @Operation(summary = "유저 댓글 생성", description = "유저가 댓글을 작성합니다.")
    @PostMapping("/{boardId}")
    public ResponseEntity<GeneralBoardCommentResponseDto> createComment(
            @RequestBody @Parameter(description = "boardId, content") GeneralBoardCommentRequestDto requestDto,
            @RequestParam Long userId) {
        GeneralBoardCommentResponseDto createdComment = commentService.createComment(requestDto, userId);
        return ResponseEntity.status(HttpStatus.CREATED).body(createdComment);
    }

    @Operation(summary = "유저 댓글 삭제", description = "유저가 댓글을 삭제합니다.")
    @DeleteMapping("/{commentId}")
    public ResponseEntity<Void> deleteComment(@PathVariable @Parameter(description = "commentId") Long commentId, @RequestParam Long userId) {
        commentService.deleteComment(commentId, userId);
        return ResponseEntity.noContent().build();
    }
}
