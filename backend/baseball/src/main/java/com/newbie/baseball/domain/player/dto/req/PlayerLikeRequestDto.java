package com.newbie.baseball.domain.player.dto.req;

import lombok.Data;

@Data
public class PlayerLikeRequestDto {

    private Long memberId;
    private Integer playerId;
}
