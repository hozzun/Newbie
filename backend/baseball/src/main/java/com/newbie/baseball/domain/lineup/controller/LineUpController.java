package com.newbie.baseball.domain.lineup.controller;

import com.newbie.baseball.domain.lineup.dto.LineUpResponseDto;
import com.newbie.baseball.domain.lineup.dto.TeamLineUpResponseDto;
import com.newbie.baseball.domain.lineup.service.LineUpService;
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
@Tag(name = "라인업 조회 API")
@RequestMapping("/lineup")
public class LineUpController {

    private final LineUpService lineUpService;

    @Operation(summary = "gameId로 해당 게임 라인업 조회")
    @GetMapping("/{gameId}")
    public ResponseEntity<List<TeamLineUpResponseDto>> getLineUp(@PathVariable Integer gameId) {
        List<TeamLineUpResponseDto> lineUps = lineUpService.getLineUpByGameId(gameId);
        return new ResponseEntity<>(lineUps, HttpStatus.OK);
    }
}