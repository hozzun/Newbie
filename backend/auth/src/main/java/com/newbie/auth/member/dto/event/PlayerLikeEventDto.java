package com.newbie.auth.member.dto.event;

import lombok.Data;

@Data
public class PlayerLikeEventDto {

    private Long memberId;
    private Integer playerId;
    private Boolean isLiked;

    public PlayerLikeEventDto(Long memberId, Integer playerId, boolean isLiked) {
        this.memberId = memberId;
        this.playerId = playerId;
        this.isLiked = isLiked;
    }
}
