package com.newbie.board.usedBoard.controller;


import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardUpdateRequestDto;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.service.UsedBoardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.apache.coyote.Response;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Optional;

@RestController
@RequiredArgsConstructor
@RequestMapping("/used-board")
public class UsedBoardController {

    private final UsedBoardService usedBoardService;

    /**
     * 유저가 게시글을 생성합니다.
     *
     * @param usedBoardDto 사용자가 입력한 게시글 정보
     * @param imageFile    업로드할 이미지 파일
     */
    @Operation(summary = "유저 게시글 생성", description = "유저가 게시글을 생성합니다.")
    @PostMapping("/create")
    public ResponseEntity<UsedBoardResponseDto> createUsedBoard(
            @ModelAttribute @Parameter(description = "userId, title, content, tagList, price, region") UsedBoardRequestDto usedBoardDto,
            @RequestPart("imageFile") MultipartFile imageFile) throws IOException {
        return ResponseEntity.status(HttpStatus.CREATED).body(usedBoardService.createUsedBoard(usedBoardDto, imageFile));
    }

    /**
     * 게시판 모든 글을 조회합니다.
     * @return List<UsedBoard>
     */
    @Operation(summary = "유저 게시글 전체 조회", description = "유저가 모든 게시글을 조회합니다.")
    @GetMapping()
    public ResponseEntity<List<UsedBoardResponseDto>> getUsedBoardList() {
        return ResponseEntity.ok(usedBoardService.getUsedBoardList());
    }


    @Operation(summary = "유저 게시글 검색", description = "유저가 특정 게시글을 검색합니다.")
    @GetMapping("/search")
    public ResponseEntity<List<UsedBoardResponseDto>> searchBoardList(
            @RequestParam @Parameter(description = "검색 키워드") String keyword,
            @RequestParam @Parameter(description = "검색 타입") String type) {
        return ResponseEntity.status(HttpStatus.OK).body(usedBoardService.searchBoardList(keyword, type));
    }

    /**
     * 게시글을 조회합니다.
     * @return UsedBoard
     */
    @Operation(summary = "유저 게시글 조회", description = "유저가 특정 게시글을 조회합니다.")
    @GetMapping("/{id}")
    public ResponseEntity<Optional<UsedBoardResponseDto>> getUsedBoard(@PathVariable @Parameter(description = "boardId") Long id) {
        return ResponseEntity.status(HttpStatus.OK).body(usedBoardService.getUsedBoardById(id));
    }

    /**
     * 게시글을 업데이트합니다.
     */
    @Operation(summary = "유저 게시글 업데이트", description = "유저가 게시글을 업데이트합니다.")
    @PutMapping("/{id}")
    public void updateUsedBoard(
            @PathVariable @Parameter(description = "boardId") Long id,
            @RequestBody @Parameter(description = "title, content, price, region") UsedBoardUpdateRequestDto usedBoardDto) {
        usedBoardService.updateUsedBoard(usedBoardDto, id);
    }

    /**
     * 게시글을 삭제합니다.
     */
    @Operation(summary = "유저 게시글 삭제", description = "유저가 특정 게시글을 삭제합니다.")
    @DeleteMapping("/{id}")
    public ResponseEntity<Void> deleteUsedBoard(@PathVariable @Parameter(description = "boardId") Long id) {
        usedBoardService.deleteUsedBoard(id);
        return ResponseEntity.noContent().build();
    }
}
