package com.newbie.baseball.domain.teamStats.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TeamPitcherStatsResponseDto {

    private Integer rank;
    private String year;
    private Integer teamId;
    private String teamName;
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
    private Integer so;
    private Integer r;
    private Integer er;
    private String whip;
}
