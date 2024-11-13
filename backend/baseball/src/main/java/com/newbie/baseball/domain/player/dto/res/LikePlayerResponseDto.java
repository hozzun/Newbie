package com.newbie.baseball.domain.player.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LikePlayerResponseDto {

    private Integer playerId;
    private Boolean isLiked;
}