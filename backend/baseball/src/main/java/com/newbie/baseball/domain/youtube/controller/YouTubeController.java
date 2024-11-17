package com.newbie.baseball.domain.youtube.controller;

import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;
import com.newbie.baseball.domain.youtube.service.YouTubeServiceImpl;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@Tag(name = "유튜브 하이라이트 조회 API")
@RestController
@RequiredArgsConstructor
@RequestMapping("/highlights")
public class YouTubeController {

    private final YouTubeServiceImpl youTubeService;

    @Operation(summary = "날짜와 팀 이름으로 KBO 경기 하이라이트 조회")
    @GetMapping("/game")
    public List<YouTubeResponseDto> getGameHighlights(
            @Parameter(description = "날짜", example = "2024-09-30") @RequestParam String date,
            @Parameter(description = "팀 이름 1", example = "키움") @RequestParam String teamName1,
            @Parameter(description = "팀 이름 2", example = "SSG") @RequestParam String teamName2) {
        return youTubeService.searchGameHighlights(date, teamName1, teamName2);
    }

    @Operation(summary = "날짜로 KBO 채널의 경기 하이라이트 조회")
    @GetMapping("/date")
    public List<YouTubeResponseDto> getHighlightsByDate(
            @Parameter(description = "날짜", example = "2024-09-30") @RequestParam String date) {
        return youTubeService.searchHighlightsByDate(date);
    }

    @Operation(summary = "선수 이름으로 하이라이트 조회")
    @GetMapping("/player")
    public List<YouTubeResponseDto> getPlayerHighlights(
            @Parameter(description = "선수 이름", example = "이정후") @RequestParam String playerName) {
        return youTubeService.searchPlayerHighlights(playerName);
    }

    @Operation(summary = "최근 경기 하이라이트 조회")
    @GetMapping("/recent")
    public YouTubeResponseDto getRecentGameHighlights() {
        return youTubeService.searchMostRecentGameHighlights();
    }
}
