package com.newbie.board.scrap.controller;

import com.newbie.board.scrap.dto.ScrapResponseDto;
import com.newbie.board.scrap.service.ScrapService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/scrap")
public class ScrapController {

    private final ScrapService scrapService;


    /**
     * 스크랩 추가
     * @param userId
     * @param boardId
     * @param boardType
     * @return
     */
    @Operation(summary = "게시글 스크랩 생성", description = "게시글 스크랩을 추가합니다.")
    @PostMapping
    public ResponseEntity<String> createScrap(
            @RequestParam Long userId,
            @RequestParam Long boardId,
            @RequestParam @Parameter(description = "general / used") String boardType) {
        String response = scrapService.toggleScrap(userId, boardId, boardType);
        return ResponseEntity.ok().body(response);
    }

    @Operation(summary = "스크랩 목록 조회", description = "사용자의 스크랩 목록을 조회합니다.")
    @GetMapping
    public ResponseEntity<List<ScrapResponseDto>> getScrapList(@RequestParam Long userId) {
        List<ScrapResponseDto> scrapList = scrapService.getScrapList(userId);
        return ResponseEntity.ok(scrapList);
    }
}
