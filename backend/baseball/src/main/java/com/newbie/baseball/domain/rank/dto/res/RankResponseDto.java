package com.newbie.baseball.domain.rank.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class RankResponseDto {

    private Integer id;
    private String year;
    private Integer rank;
    private Integer teamId;
    private String teamName;
    private Integer gameCount;
    private Integer winCount;
    private Integer loseCount;
    private Integer drawCount;
    private String winRate;
    private String gameDiff;
    private String recent10;
    private String streak;
    private Integer rankChange;
    private Integer rankChangeAmount;
}