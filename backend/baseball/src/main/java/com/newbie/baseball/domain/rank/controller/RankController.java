package com.newbie.baseball.domain.rank.controller;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;
import com.newbie.baseball.domain.rank.service.RankService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<RankResponseDto>> getAllRanks() {
        List<RankResponseDto> ranks = rankService.getAllRanks();
        return new ResponseEntity<>(ranks, HttpStatus.OK);
    }

    @Operation(summary = "년도로 순위 및 성적 조회")
    @GetMapping("/year/{year}")
    public ResponseEntity<List<RankResponseDto>> getRanksByYear(@PathVariable("year") String year) {
        List<RankResponseDto> ranks = rankService.getRanksByYear(year);
        return new ResponseEntity<>(ranks, HttpStatus.OK);
    }

    @Operation(summary = "teamId로 해당 팀 순위 및 성적 조회 (2021년 ~ 2024년)")
    @GetMapping("/team/{teamId}")
    public ResponseEntity<List<RankResponseDto>> getRanksByTeamId(@PathVariable("teamId") Integer teamId) {
        List<RankResponseDto> ranks = rankService.getRanksByTeamId(teamId);
        return new ResponseEntity<>(ranks, HttpStatus.OK);
    }

    @Operation(summary = "year와 teamId로 년도 해당 팀 순위 및 성적 조회")
    @GetMapping("/{year}/{teamId}")
    public ResponseEntity<RankResponseDto> getRankByYearAndTeamId(@PathVariable("year") String year, @PathVariable("teamId") Integer teamId) {
        RankResponseDto rank = rankService.getRankByYearAndTeamId(year, teamId);
        return new ResponseEntity<>(rank, HttpStatus.OK);
    }
}
