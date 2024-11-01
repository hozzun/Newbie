package com.newbie.baseball.domain.game.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class GameResponseDto {

    private Integer id;
    private String date;
    private String time;
    private String homeTeamName;
    private String awayTeamName;
    private Integer homTeamId;
    private Integer awayTeamId;
    private Integer homeScore;
    private Integer awayScore;
    private String gameResult;
    private String stadium;
    private String season;
}