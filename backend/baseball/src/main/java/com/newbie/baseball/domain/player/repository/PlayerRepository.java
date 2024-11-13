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
    Optional<Player> findByTeamIdAndBackNumber(Integer teamId, String backNumber);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId " +
            "ORDER BY " +
            "CASE WHEN p.backNumber = '미정' THEN 1 ELSE 0 END ASC, " +
            "CAST(p.backNumber AS int) ASC")
    Page<Player> findByTeamIdOrderByBackNumberAsc(Integer teamId, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId ORDER BY p.likeCount DESC")
    Page<Player> findByTeamIdOrderByLikeCountDesc(@Param("teamId") Integer teamId, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId AND p.position = :position ORDER BY p.likeCount DESC")
    Page<Player> findByTeamIdAndPositionOrderByLikeCountDesc(@Param("teamId") Integer teamId, @Param("position") String position, Pageable pageable);

    @Query("SELECT p FROM Player p WHERE p.team.id = :teamId AND p.position = :position " +
            "ORDER BY " +
            "CASE WHEN p.backNumber = '미정' THEN 1 ELSE 0 END ASC, " +
            "CAST(p.backNumber AS int) ASC")
    Page<Player> findByTeamIdAndPositionOrderByBackNumberAsc(@Param("teamId") Integer teamId, @Param("position") String position, Pageable pageable);
}