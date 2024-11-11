package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.util.List;

public interface GameService {

    GameResponseDto getGameById(Integer id);
    List<GameResponseDto> getGamesByDateAndOptionalTeam(String year, String month, String day, Integer teamId);
    SseEmitter streamRealTimeGameData(Integer gameId);
}