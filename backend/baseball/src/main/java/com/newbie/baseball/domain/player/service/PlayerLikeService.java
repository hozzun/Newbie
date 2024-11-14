package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;

import java.util.List;

public interface PlayerLikeService {

    void toggleLike(Long memberId, Integer playerId);
    List<LikePlayerResponseDto> getLikedPlayersByMember(Long memberId);
    LikePlayerResponseDto getLikedPlayer(Long memberId, Integer playerId);
}