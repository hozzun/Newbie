package com.newbie.baseball.domain.game.controller;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.service.GameService;
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
@Tag(name = "경기정보 조회 API")
@RequestMapping("/games")
public class GameController {

    private final GameService gameService;

    @Operation(summary = "ID로 경기조회")
    @GetMapping("/{id}")
    public GameResponseDto getGameById(@PathVariable Integer id) {
        return gameService.getGameById(id);
    }

    @Operation(summary = "날짜(년-월)로 경기조회 (ex. 2024-09)")
    @GetMapping("/{year}/{month}")
    public List<GameResponseDto> getGameByYearAndMonth(@PathVariable String year, @PathVariable String month) {
        return gameService.getGameByYearAndMonth(year + "-" + month);
    }

    @Operation(summary = "날짜로 경기조회 (ex. 2024-09-23)")
    @GetMapping("/{year}/{month}/{day}")
    public List<GameResponseDto> getGameByDate(@PathVariable String year, @PathVariable String month, @PathVariable String day) {
        return gameService.getGameByDate(year + "-" + month + "-" + day);
    }
}