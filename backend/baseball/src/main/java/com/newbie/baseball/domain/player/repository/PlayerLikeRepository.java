package com.newbie.baseball.domain.player.repository;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;
import com.newbie.baseball.domain.player.entity.PlayerLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface PlayerLikeRepository extends JpaRepository<PlayerLike, Integer> {

    Optional<PlayerLike> findByMemberIdAndPlayerId(Long memberId, Integer playerId);
    List<PlayerLike> findByMemberId(Long memberId);
}