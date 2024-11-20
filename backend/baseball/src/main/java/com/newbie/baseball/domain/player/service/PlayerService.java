package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;

public interface PlayerService {

    PlayerResponseDto getPlayerById(Integer id);
    Page<PlayerResponseDto> getPlayersByTeam(Integer teamId, String position, String sortBy, Pageable pageable);
    PlayerResponseDto getPlayerByTeamIdAndBackNumber(Integer teamId, String backNumber);
}