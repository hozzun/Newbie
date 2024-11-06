package com.newbie.baseball.domain.team.repository;

import com.newbie.baseball.domain.team.entity.Team;
import org.springframework.data.jpa.repository.JpaRepository;

public interface TeamRepository extends JpaRepository<Team, Integer> {
}
