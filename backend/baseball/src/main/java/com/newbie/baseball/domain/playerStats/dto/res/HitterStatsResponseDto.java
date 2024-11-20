package com.newbie.baseball.domain.playerStats.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class HitterStatsResponseDto {

    private String year;
    private String playerName;
    private Integer playerId;
    private String teamName;
    private Integer teamId;
    private String avg;
    private Integer gameCount;
    private Integer pa;
    private Integer ab;
    private Integer r;
    private Integer h;
    private Integer two;
    private Integer three;
    private Integer homerun;
    private Integer tb;
    private Integer rbi;
    private Integer sac;
    private Integer sf;
}
