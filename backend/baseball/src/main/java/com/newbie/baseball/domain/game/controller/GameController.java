package com.newbie.baseball.domain.game.controller;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.service.GameService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "경기정보 조회 API")
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "gameID로 경기조회")
    @GetMapping("/{gameId}")
    public ResponseEntity<GameResponseDto> getGameById(
            @Parameter(description = "게임 ID", example = "3291")
            @PathVariable Integer gameId) {
        GameResponseDto game = gameService.getGameById(gameId);
        return new ResponseEntity<>(game, HttpStatus.OK);
    }

    @Operation(summary = "날짜와 팀 ID로 경기 조회 (옵션: 월, 일, 팀ID)")
    @GetMapping()
    public ResponseEntity<List<GameResponseDto>> getGamesByDateAndOptionalTeam(
            @Parameter(description = "연도 [ 2021 ~ 2024 ]", example = "2024") @RequestParam String year,
            @Parameter(description = "월 (옵션)", example = "09") @RequestParam(required = false) String month,
            @Parameter(description = "일 (옵션)", example = "23") @RequestParam(required = false) String day,
            @Parameter(description = "팀 ID (옵션) [ 1 ~ 10 ]", example = "1") @RequestParam(required = false) Integer teamId) {

        List<GameResponseDto> games = gameService.getGamesByDateAndOptionalTeam(year, month, day, teamId);
        return new ResponseEntity<>(games, HttpStatus.OK);
    }

    @Operation(summary = "특정 경기 실시간 정보 스트리밍")
    @GetMapping(value = "/real-time/{gameId}", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter streamRealTimeGameData(@PathVariable Integer gameId) {
        return gameService.streamRealTimeGameData(gameId);
    }
}