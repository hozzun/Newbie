package com.newbie.baseball.domain.playerStats.controller;

import com.newbie.baseball.domain.playerStats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.playerStats.dto.res.PitcherStatsResponseDto;
import com.newbie.baseball.domain.playerStats.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Tag(name = "선수성적 조회 API")
@RequestMapping("/stats")
public class StatsController {

    private final StatsService hitterStatsService;
    private final StatsService pitcherStatsService;

    @Operation(summary = "PlayerId로 타자 성적 조회")
    @GetMapping("/hitters/{playerId}")
    public ResponseEntity<HitterStatsResponseDto> getHitterStats(
            @Parameter(description = "선수 ID", example = "12") @PathVariable Integer playerId) {
        HitterStatsResponseDto hitter = hitterStatsService.getHitterStats(playerId);
        return new ResponseEntity<>(hitter, HttpStatus.OK);
    }

    @Operation(summary = "PlayerId로 투수 성적 조회")
    @GetMapping("/pitchers/{playerId}")
    public ResponseEntity<PitcherStatsResponseDto> getPitcherStats(
            @Parameter(description = "선수 ID", example = "54") @PathVariable Integer playerId) {
        PitcherStatsResponseDto pitcher = pitcherStatsService.getPitcherStats(playerId);
        return new ResponseEntity<>(pitcher, HttpStatus.OK);
    }
}