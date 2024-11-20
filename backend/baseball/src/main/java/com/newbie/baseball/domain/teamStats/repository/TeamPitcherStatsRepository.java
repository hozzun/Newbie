package com.newbie.baseball.domain.teamStats.repository;

import com.newbie.baseball.domain.teamStats.entity.TeamHitterStats;
import com.newbie.baseball.domain.teamStats.entity.TeamPitcherStats;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface TeamPitcherStatsRepository extends JpaRepository<TeamPitcherStats, Integer> {

    List<TeamPitcherStats> findByTeamId(Integer teamId);
    Optional<TeamPitcherStats> findByTeamIdAndYear(Integer teamId, String year);
}
