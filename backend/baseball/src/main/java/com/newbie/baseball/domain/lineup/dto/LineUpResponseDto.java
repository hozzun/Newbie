package com.newbie.baseball.domain.lineup.dto;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class LineUpResponseDto {

    private Integer gameId;
    private Integer teamId;
    private String teamName;
    private Integer playerId;
    private String playerName;
    private Integer battingOrder;
    private String position;
    private String war;
}