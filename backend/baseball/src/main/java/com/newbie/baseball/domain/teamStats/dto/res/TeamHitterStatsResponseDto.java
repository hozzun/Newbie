package com.newbie.baseball.domain.teamStats.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TeamHitterStatsResponseDto {

    private Integer rank;
    private String year;
    private Integer teamId;
    private String teamName;
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
