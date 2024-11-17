package com.newbie.baseball.domain.playerStats.repository;

import com.newbie.baseball.domain.playerStats.entity.PitcherStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PitcherStatsRepository extends JpaRepository<PitcherStats, Integer> {

    List<PitcherStats> findByPlayerId(Integer playerId);
    Optional<PitcherStats> findByPlayerIdAndYear(Integer playerId, String year);
}
