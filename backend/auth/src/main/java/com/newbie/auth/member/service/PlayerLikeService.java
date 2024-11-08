package com.newbie.auth.member.service;

import com.newbie.auth.member.dto.event.PlayerLikeEventDto;

public interface PlayerLikeService {

    void toggleLike(Long memberId, Integer playerId);
}