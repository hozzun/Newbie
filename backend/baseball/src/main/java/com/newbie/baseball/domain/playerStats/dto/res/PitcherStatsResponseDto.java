package com.newbie.baseball.domain.playerStats.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PitcherStatsResponseDto {

    private String year;
    private String playerName;
    private Integer playerId;
    private String teamName;
    private Integer teamId;
    private String era;
    private Integer gameCount;
    private Integer win;
    private Integer lose;
    private Integer save;
    private Integer hld;
    private String wpct;
    private String ip;
    private Integer h;
    private Integer hr;
    private Integer bb;
    private Integer hbp;
    private Integer so;
    private Integer r;
    private Integer er;
    private String whip;
}
