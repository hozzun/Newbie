package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.entity.Game;

import java.util.List;

public interface GameService {

    Game getGameById(Integer id);

    List<Game> getGameByYearAndMonth(String yearMonth);
}