package com.newbie.baseball.domain.playerStats.repository;

import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.playerStats.entity.HitterStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface HitterStatsRepository extends JpaRepository<HitterStats, Integer> {

    List<HitterStats> findByPlayerId(Integer playerId);
    Optional<HitterStats> findByPlayerIdAndYear(Integer playerId, String year);
}
