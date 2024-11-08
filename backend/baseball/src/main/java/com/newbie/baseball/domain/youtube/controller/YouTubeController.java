package com.newbie.baseball.domain.youtube.controller;

import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;
import com.newbie.baseball.domain.youtube.service.YouTubeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;
import java.util.List;

@Tag(name = "유튜브 하이라이트 조회 API")
@RestController
@RequiredArgsConstructor
public class YouTubeController {

    private final YouTubeServiceImpl youTubeService;

    @Operation(summary = "date 로 해당 날짜 경기 하이라이트 조회")
    @GetMapping("/highlights/game")
    public List<YouTubeResponseDto> getGameHighlights(
            @Parameter(description = "날짜", example = "2024-09-23") @RequestParam String date) {
        String query = date + " KBO 경기 하이라이트";
        return fetchHighlights(query);
    }

    @Operation(summary = "playerName 으로 해당 선수 하이라이트 조회")
    @GetMapping("/highlights/player")
    public List<YouTubeResponseDto> getPlayerHighlights(
            @Parameter(description = "선수 이름", example = "김광현") @RequestParam String playerName) {
        String query = playerName + " 야구 하이라이트";
        return fetchHighlights(query);
    }

    private List<YouTubeResponseDto> fetchHighlights(String query) {
        try {
            return youTubeService.searchVideos(query);
        } catch (IOException e) {
            throw new RuntimeException("YouTube API 요청 중 오류 발생", e);
        }
    }
}
