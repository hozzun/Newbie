package com.newbie.board.usedBoard.controller;


import com.fasterxml.jackson.databind.ObjectMapper;
import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardCommentResponseDto;
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
import org.springframework.http.MediaType;
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
     * @param usedBoardJson
     */
    @Operation(summary = "유저 게시글 생성", description = "유저가 게시글을 생성합니다.")
    @PostMapping(value = "/create", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<UsedBoardResponseDto> createUsedBoard(
            @RequestPart("usedBoard") String usedBoardJson,
            @RequestPart(value = "imageFile", required = false) MultipartFile imageFile,
            @RequestHeader("X-Member-ID") String userId) throws IOException {

        // JSON 문자열을 DTO로 변환
        ObjectMapper objectMapper = new ObjectMapper();
        UsedBoardRequestDto usedBoardDto = objectMapper.readValue(usedBoardJson, UsedBoardRequestDto.class);

        return ResponseEntity.status(HttpStatus.CREATED)
                .body(usedBoardService.createUsedBoard(usedBoardDto, imageFile, userId));
    }


    /**
     * 게시판 모든 글을 조회합니다.
     * @return List<UsedBoard>
     */
    @Operation(summary = "유저 게시글 전체 조회", description = "유저가 모든 게시글을 조회합니다.")
    @GetMapping()
    public ResponseEntity<List<UsedBoardResponseDto>> getUsedBoardList() {
        List<UsedBoardResponseDto> responseDto = usedBoardService.getUsedBoardList();
        if (responseDto != null) {
            return ResponseEntity.ok(responseDto);
        } else {
            return ResponseEntity.status(HttpStatus.NO_CONTENT).build();
        }
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
    public ResponseEntity<Optional<UsedBoardResponseDto>> getUsedBoard(@PathVariable @Parameter(description = "boardId") Long id,
                                                                       @RequestHeader("X-Member-ID") String userId) {
        return ResponseEntity.status(HttpStatus.OK).body(usedBoardService.getUsedBoardById(id, userId));
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
