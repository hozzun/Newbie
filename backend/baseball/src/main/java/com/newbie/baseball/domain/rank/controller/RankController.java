package com.newbie.baseball.domain.rank.controller;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;
import com.newbie.baseball.domain.rank.service.RankService;
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
@Tag(name = "팀 순위 조회 API")
@RequestMapping("/ranks")
public class RankController {

    private final RankService rankService;

    @Operation(summary = "전체 순위 및 성적 조회 (2021년 ~ 2024년)")
    @GetMapping
    public List<RankResponseDto> getAllRanks() {
        return rankService.getAllRanks();
    }

    @Operation(summary = "년도로 순위 및 성적 조회")
    @GetMapping("/year/{year}")
    public List<RankResponseDto> getRanksByYear(@PathVariable("year") String year) {
        return rankService.getRanksByYear(year);
    }

    @Operation(summary = "teamId로 해당 팀 순위 및 성적 조회 (2021년 ~ 2024년)")
    @GetMapping("/team/{teamId}")
    public List<RankResponseDto> getRanksByTeamId(@PathVariable("teamId") Integer teamId) {
        return rankService.getRanksByTeamId(teamId);
    }

    @Operation(summary = "year와 teamId로 년도 해당 팀 순위 및 성적 조회")
    @GetMapping("/{year}/{teamId}")
    public RankResponseDto getRankByYearAndTeamId(@PathVariable("year") String year, @PathVariable("teamId") Integer teamId) {
        return rankService.getRankByYearAndTeamId(year, teamId);
    }
}
