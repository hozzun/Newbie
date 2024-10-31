package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public Game getGameById(Integer id) {
        return gameRepository.findById(id)
                .orElseThrow(() -> new GameNotFoundException(id));
    }

    @Override
    public List<Game> getGameByYearAndMonth(String yearMonth) {
        return gameRepository.findByDateStartingWith(yearMonth);
    }

}