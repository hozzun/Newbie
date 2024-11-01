package com.newbie.baseball.domain.stats.repository;

import com.newbie.baseball.domain.stats.entity.PitcherStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface PitcherStatsRepository extends JpaRepository<PitcherStats, Integer> {

    Optional<PitcherStats> findByPlayerId(Integer playerId);
}
