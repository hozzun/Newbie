package com.newbie.board.generalBoard.controller;

import com.newbie.board.generalBoard.dto.GeneralBoardRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.generalBoard.dto.GeneralBoardUpdateRequestDto;
import com.newbie.board.generalBoard.service.GeneralBoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/general-board")
public class GeneralBoardController {

    private final GeneralBoardService generalBoardService;

    @Operation(summary = "유저 게시글 생성", description = "유저가 게시글을 생성합니다.")
    @PostMapping("/create")
    public ResponseEntity<GeneralBoardResponseDto> createGeneralBoard(
            @ModelAttribute @Parameter(description = "userId, title, content, tags") GeneralBoardRequestDto generalBoardDto,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(generalBoardService.createGeneralBoard(generalBoardDto, imageFile));
    }

    @Operation(summary = "유저 게시글 전체 조회", description = "유저가 모든 게시글을 조회합니다.")
    @GetMapping()
    public ResponseEntity<List<GeneralBoardResponseDto>> getGeneralBoardList() {
        return ResponseEntity.ok(generalBoardService.getGeneralBoardList());
    }

    @Operation(summary = "유저 게시글 검색", description = "유저가 특정 게시글을 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity<List<GeneralBoardResponseDto>> searchBoardList(@RequestParam(required = false) @Parameter(description = "title, tags, username") String keyword) {
        return ResponseEntity.status(HttpStatus.OK).body(generalBoardService.searchBoardList(keyword));
    }

    @Operation(summary = "유저 게시글 조회", description = "유저가 특정 게시글을 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<GeneralBoardResponseDto>> getGeneralBoard(@PathVariable @Parameter(description = "boardId") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(generalBoardService.getGeneralBoardById(id));
    }

    @Operation(summary = "유저 게시글 업데이트", description = "유저가 게시글을 업데이트합니다.")
    @PutMapping("/{id}")
    public void updateGeneralBoard(
            @PathVariable @Parameter(description = "boardId") Long id,
            @RequestBody @Parameter(description = "title, content") GeneralBoardUpdateRequestDto generalBoardDto) {
        generalBoardService.updateGeneralBoard(generalBoardDto, id);
    }

    @Operation(summary = "유저 게시글 삭제", description = "유저가 특정 게시글을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteGeneralBoard(@PathVariable @Parameter(description = "boardId") Long id) {
        generalBoardService.deleteGeneralBoard(id);
        return ResponseEntity.noContent().build();
    }
}