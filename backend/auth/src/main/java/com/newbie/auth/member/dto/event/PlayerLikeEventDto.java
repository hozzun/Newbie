package com.newbie.auth.member.dto.event;

import lombok.Data;

@Data
public class PlayerLikeEventDto {

    private Long memberId;
    private Integer playerId;

    public PlayerLikeEventDto(Long memberId, Integer playerId) {
        this.memberId = memberId;
        this.playerId = playerId;
    }
}
