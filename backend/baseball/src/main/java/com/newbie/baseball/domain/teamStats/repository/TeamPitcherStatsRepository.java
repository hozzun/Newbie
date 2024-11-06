package com.newbie.baseball.domain.teamStats.repository;

import com.newbie.baseball.domain.teamStats.entity.TeamPitcherStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamPitcherStatsRepository extends JpaRepository<TeamPitcherStats, Integer> {

    Optional<TeamPitcherStats> findByTeamId(Integer teamId);
}
