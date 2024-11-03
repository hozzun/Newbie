package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;

public interface PlayerService {

    PlayerResponseDto getPlayerById(Integer id);
}