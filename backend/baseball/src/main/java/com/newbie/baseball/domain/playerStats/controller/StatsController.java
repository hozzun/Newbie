package com.newbie.baseball.domain.playerStats.controller;

import com.newbie.baseball.domain.playerStats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.playerStats.dto.res.PitcherStatsResponseDto;
import com.newbie.baseball.domain.playerStats.service.StatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
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

    @Operation(summary = "PlayerId로 타자 성적 조회")
    @GetMapping("/hitters/{playerId}")
    public HitterStatsResponseDto getHitterStats(@PathVariable Integer playerId) {
        return hitterStatsService.getHitterStats(playerId);
    }

    @Operation(summary = "PlayerId로 투수 성적 조회")
    @GetMapping("/pitchers/{playerId}")
    public PitcherStatsResponseDto getPitcherStats(@PathVariable Integer playerId) {
        return hitterStatsService.getPitcherStats(playerId);
    }
}