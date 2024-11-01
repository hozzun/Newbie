package com.newbie.baseball.domain.stats.repository;

import com.newbie.baseball.domain.stats.entity.HitterStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface HitterStatsRepository extends JpaRepository<HitterStats, Integer> {

    Optional<HitterStats> findByPlayerId(Integer playerId);
}
