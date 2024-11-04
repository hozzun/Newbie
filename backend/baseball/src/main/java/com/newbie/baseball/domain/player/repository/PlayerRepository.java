package com.newbie.baseball.domain.player.repository;

import com.newbie.baseball.domain.player.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    List<Player> findByTeamId(Integer teamId);
    List<Player> findByTeamIdAndPosition(Integer teamId, String position);
    Optional<Player> findByTeamIdAndBackNumberAndName(Integer teamId, String backNumber, String name);
}