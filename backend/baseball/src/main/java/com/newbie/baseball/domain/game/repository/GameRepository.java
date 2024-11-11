package com.newbie.baseball.domain.game.repository;

import com.newbie.baseball.domain.game.entity.Game;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;

public interface GameRepository extends JpaRepository<Game, Integer> {

// 연도만 입력된 경우 (예: 2024)
    @Query("SELECT g FROM Game g WHERE g.date LIKE :year%")
    List<Game> findByYear(@Param("year") String year);

    // 연도와 월만 입력된 경우 (예: 2024-09)
    @Query("SELECT g FROM Game g WHERE g.date LIKE :yearMonth%")
    List<Game> findByYearAndMonth(@Param("yearMonth") String yearMonth);

    // 연도, 월, 일이 모두 입력된 경우 (예: 2024-09-23)
    List<Game> findByDate(String date);

    // 연도와 팀 ID로 조회
    @Query("SELECT g FROM Game g WHERE g.date LIKE :year% AND (g.homeTeam.id = :teamId OR g.awayTeam.id = :teamId)")
    List<Game> findByYearAndTeam(@Param("year") String year, @Param("teamId") Integer teamId);

    // 연월과 팀 ID로 조회
    @Query("SELECT g FROM Game g WHERE g.date LIKE :yearMonth% AND (g.homeTeam.id = :teamId OR g.awayTeam.id = :teamId)")
    List<Game> findByYearAndMonthAndTeam(@Param("yearMonth") String yearMonth, @Param("teamId") Integer teamId);

    // 연월일과 팀 ID로 조회
    @Query("SELECT g FROM Game g WHERE g.date = :date AND (g.homeTeam.id = :teamId OR g.awayTeam.id = :teamId)")
    List<Game> findByDateAndTeam(@Param("date") String date, @Param("teamId") Integer teamId);
}