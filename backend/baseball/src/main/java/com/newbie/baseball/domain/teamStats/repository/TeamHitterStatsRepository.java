package com.newbie.baseball.domain.teamStats.repository;

import com.newbie.baseball.domain.teamStats.entity.TeamHitterStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface TeamHitterStatsRepository extends JpaRepository<TeamHitterStats, Integer> {

    Optional<TeamHitterStats> findByTeamId(Integer teamId);
}
