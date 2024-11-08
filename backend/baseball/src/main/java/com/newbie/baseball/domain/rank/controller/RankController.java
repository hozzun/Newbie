package com.newbie.baseball.domain.rank.controller;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;
import com.newbie.baseball.domain.rank.service.RankService;
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
@Tag(name = "팀 순위 조회 API")
@RequestMapping("/ranks")
public class RankController {

    private final RankService rankService;

    @Operation(summary = "팀 순위 및 성적 조회 (옵션: 연도, 팀ID)")
    @GetMapping
    public ResponseEntity<List<RankResponseDto>> getRanks(
            @Parameter(description = "조회할 연도 (옵션) [ 2021 ~ 2024 ]", example = "2024") @RequestParam(value = "year", required = false) String year,
            @Parameter(description = "조회할 팀 ID (옵션)", example = "1") @RequestParam(value = "teamId", required = false) Integer teamId) {
        List<RankResponseDto> ranks = rankService.getRanks(year, teamId);
        return new ResponseEntity<>(ranks, HttpStatus.OK);
    }
}
