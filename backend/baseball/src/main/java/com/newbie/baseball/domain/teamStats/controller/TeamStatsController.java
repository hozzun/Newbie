package com.newbie.baseball.domain.teamStats.controller;

import com.newbie.baseball.domain.teamStats.dto.res.TeamHitterStatsResponseDto;
import com.newbie.baseball.domain.teamStats.dto.res.TeamPitcherStatsResponseDto;
import com.newbie.baseball.domain.teamStats.service.TeamStatsService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "팀 성적 조회 API")
@RequestMapping("/team/stats")
public class TeamStatsController {

    private final TeamStatsService teamStatsService;

    @Operation(summary = "전체 팀 타자 성적 조회")
    @GetMapping("/hitter")
    public List<TeamHitterStatsResponseDto> teamHitterStats() {
        return teamStatsService.getAllTeamHitterStats();
    }

    @Operation(summary = "teamId로 해당 팀 타자(전체) 성적 조회")
    @GetMapping("/hitter/{teamId}")
    public TeamHitterStatsResponseDto getTeamHitterStats(@PathVariable("teamId") Integer teamId) {
        return teamStatsService.getTeamHitterStatsByTeamId(teamId);
    }

    @Operation(summary = "전체 팀 투수 성적 조회")
    @GetMapping("/pitcher")
    public List<TeamPitcherStatsResponseDto> getTeamPitcherStats() {
        return teamStatsService.getAllTeamPitcherStats();
    }

    @Operation(summary = "teamId로 해당 팀 투수(전체) 성적 조회")
    @GetMapping("/pitcher/{teamId}")
    public TeamPitcherStatsResponseDto getTeamPitcherStats(@PathVariable("teamId") Integer teamId) {
        return teamStatsService.getTeamPitcherStatsByTeamId(teamId);
    }
}
