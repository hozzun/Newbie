package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.service.PlayerService;
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
@Tag(name = "선수정보 조회 API")
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Operation(summary = "playerId로 선수조회")
    @GetMapping("/player/{playerId}")
    public PlayerResponseDto getPlayerById(@PathVariable("playerId") Integer playerId) {
        return playerService.getPlayerById(playerId);
    }

    @Operation(summary = "teamId로 팀별 선수조회")
    @GetMapping("/team/{teamId}")
    public List<PlayerResponseDto> getPlayersByTeamId(@PathVariable("teamId") Integer teamId) {
        return playerService.getPlayersByTeamId(teamId);
    }

    @Operation(summary = "teamId, position 으로 해당 팀 포지션별 선수조회")
    @GetMapping("/{teamId}/{position}")
    public List<PlayerResponseDto> getPlayersByTeamIdAndPosition(@PathVariable("teamId") Integer teamId, @PathVariable("position") String position) {
        return playerService.getPlayersByTeamIdAndPosition(teamId, position);
    }

    @Operation(summary = "teamId, backNumber, playerName 으로 팀, 등번호, 선수이름으로 해당 선수조회")
    @GetMapping("/{teamId}/{backNumber}/{playerName}")
    public PlayerResponseDto getPlayerByTeamIdAndBackNumberAndPlayerName(@PathVariable("teamId") Integer teamId, @PathVariable("backNumber") String backNumber, @PathVariable("playerName") String playerName) {
        return playerService.getPlayerByTeamIdAndBackNumberAndPlayerName(teamId, backNumber, playerName);
    }
}