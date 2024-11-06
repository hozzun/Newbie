package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;

import java.util.List;

public interface PlayerService {

    PlayerResponseDto getPlayerById(Integer id);
    List<PlayerResponseDto> getPlayersByTeamId(Integer teamId);
    List<PlayerResponseDto> getPlayersByTeamIdAndPosition(Integer teamId, String position);
    PlayerResponseDto getPlayerByTeamIdAndBackNumberAndPlayerName(Integer teamId, String backNumber, String playerName);
}