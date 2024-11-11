package com.newbie.baseball.domain.player.service;

public interface PlayerLikeService {

    void toggleLike(Long memberId, Integer playerId);
}