package com.newbie.baseball.domain.teamStats.controller;

import com.newbie.baseball.domain.teamStats.dto.res.TeamHitterStatsResponseDto;
import com.newbie.baseball.domain.teamStats.dto.res.TeamPitcherStatsResponseDto;
import com.newbie.baseball.domain.teamStats.service.TeamStatsService;
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
@Tag(name = "팀 성적 조회 API")
@RequestMapping("/team/stats")
public class TeamStatsController {

    private final TeamStatsService teamStatsService;

    @Operation(summary = "전체 팀 타자 성적 조회")
    @GetMapping("/hitter")
    public ResponseEntity<List<TeamHitterStatsResponseDto>> teamHitterStats() {
        List<TeamHitterStatsResponseDto> teamStats = teamStatsService.getAllTeamHitterStats();
        return new ResponseEntity<>(teamStats, HttpStatus.OK);
    }

    @Operation(summary = "teamId로 해당 팀 타자 성적 조회")
    @GetMapping("/hitter/{teamId}")
    public ResponseEntity<List<TeamHitterStatsResponseDto>> getTeamHitterStats(
            @Parameter(description = "팀 ID [ 1 ~ 10 ]", example = "1") @PathVariable("teamId") Integer teamId,
            @Parameter(description = "연도 [ 2020 ~ 2024 ] (옵션)", example = "2024") @RequestParam(required = false) String year) {
        if (year != null) {
            TeamHitterStatsResponseDto teamHitterStat = teamStatsService.getTeamHitterStatsByIdAndYear(teamId, year);
            return new ResponseEntity<>(List.of(teamHitterStat), HttpStatus.OK);
        } else {
            List<TeamHitterStatsResponseDto> teamHitterStats = teamStatsService.getTeamHitterStatsByTeamId(teamId);
            return new ResponseEntity<>(teamHitterStats, HttpStatus.OK);
        }
    }

    @Operation(summary = "전체 팀 투수 성적 조회")
    @GetMapping("/pitcher")
    public ResponseEntity<List<TeamPitcherStatsResponseDto>> getTeamPitcherStats() {
        List<TeamPitcherStatsResponseDto> teamStats = teamStatsService.getAllTeamPitcherStats();
        return new ResponseEntity<>(teamStats, HttpStatus.OK);
    }

    @Operation(summary = "teamId로 해당 팀 투수 성적 조회")
    @GetMapping("/pitcher/{teamId}")
    public ResponseEntity<List<TeamPitcherStatsResponseDto>> getTeamPitcherStats(
            @Parameter(description = "팀 ID [ 1 ~ 10 ]", example = "1") @PathVariable("teamId") Integer teamId,
            @Parameter(description = "연도 [ 2020 ~ 2024 ]", example = "2024") @RequestParam(required = false) String year) {
        if (year != null) {
            TeamPitcherStatsResponseDto teamPitcherStat = teamStatsService.getTeamPitcherStatsByIdAndYear(teamId, year);
            return new ResponseEntity<>(List.of(teamPitcherStat), HttpStatus.OK);
        } else {
            List<TeamPitcherStatsResponseDto> teamPitcherStats = teamStatsService.getTeamPitcherStatsByTeamId(teamId);
            return new ResponseEntity<>(teamPitcherStats, HttpStatus.OK);
        }
    }
}
