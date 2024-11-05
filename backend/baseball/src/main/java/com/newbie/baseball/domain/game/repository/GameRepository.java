package com.newbie.baseball.domain.game.repository;

import com.newbie.baseball.domain.game.entity.Game;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {

    List<Game> findByDateStartingWith(String yearMonth);
    List<Game> findByDate(String date);
    List<Game> findByDateAndHomeTeamIdOrDateAndAwayTeamId(String date, Integer homeTeamId, String date2, Integer awayTeamId);
}