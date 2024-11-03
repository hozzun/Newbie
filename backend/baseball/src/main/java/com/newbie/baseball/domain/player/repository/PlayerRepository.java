package com.newbie.baseball.domain.player.repository;

import com.newbie.baseball.domain.player.entity.Player;
import org.springframework.data.jpa.repository.JpaRepository;

public interface PlayerRepository extends JpaRepository<Player, Integer> {
}