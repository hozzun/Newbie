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
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "선수성적 조회 API")
@RequestMapping("/stats")
public class StatsController {

    private final StatsService hitterStatsService;
    private final StatsService pitcherStatsService;

    @Operation(summary = "PlayerId로 타자 성적 조회")
    @GetMapping("/hitters/{playerId}")
    public ResponseEntity<List<HitterStatsResponseDto>> getHitterStats(
            @Parameter(description = "선수 ID", example = "12") @PathVariable Integer playerId,
            @Parameter(description = "연도 [ 2020 ~ 2024 ] (옵션)", example = "2024") @RequestParam(required = false) String year) {
        if (year != null) {
            HitterStatsResponseDto hitterStat = hitterStatsService.getHittersStatsByYear(playerId, year);
            return new ResponseEntity<>(List.of(hitterStat), HttpStatus.OK);
        } else {
            List<HitterStatsResponseDto> hitterStats = hitterStatsService.getHitterStats(playerId);
            return new ResponseEntity<>(hitterStats, HttpStatus.OK);
        }
    }

    @Operation(summary = "PlayerId로 투수 성적 조회")
    @GetMapping("/pitchers/{playerId}")
    public ResponseEntity<List<PitcherStatsResponseDto>> getPitcherStats(
            @Parameter(description = "선수 ID", example = "54") @PathVariable Integer playerId,
            @Parameter(description = "연도 [ 2020 ~ 2024 ] (옵션)", example = "2024") @RequestParam(required = false) String year) {
        if (year != null) {
            PitcherStatsResponseDto pitcherStat = pitcherStatsService.getPitchersStatsByYear(playerId, year);
            return new ResponseEntity<>(List.of(pitcherStat), HttpStatus.OK);
        } else {
            List<PitcherStatsResponseDto> pitcherStats = pitcherStatsService.getPitcherStats(playerId);
            return new ResponseEntity<>(pitcherStats, HttpStatus.OK);
        }
    }
}