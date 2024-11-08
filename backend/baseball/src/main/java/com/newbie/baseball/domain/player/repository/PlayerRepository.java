package com.newbie.baseball.domain.player.repository;

import com.newbie.baseball.domain.player.entity.Player;
import io.lettuce.core.dynamic.annotation.Param;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.Optional;

public interface PlayerRepository extends JpaRepository<Player, Integer> {

    Page<Player> findByTeamId(Integer teamId, Pageable pageable);
    Page<Player> findByTeamIdAndPosition(Integer teamId, String position, Pageable pageable);
    Optional<Player> findByTeamIdAndBackNumberAndName(Integer teamId, String backNumber, String name);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId ORDER BY CAST(p.backNumber AS int) ASC")
    Page<Player> findByTeamIdOrderByBackNumberDesc(Integer teamId, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId ORDER BY p.likeCount DESC")
    Page<Player> findByTeamIdOrderByLikeCountDesc(@Param("teamId") Integer teamId, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId AND p.position = :position ORDER BY p.likeCount DESC")
    Page<Player> findByTeamIdAndPositionOrderByLikeCountDesc(@Param("teamId") Integer teamId, @Param("position") String position, Pageable pageable);
}