package com.newbie.baseball.domain.game.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class ScheduledGameResponseDto {

    private Integer gameId;
    private String date;
    private String time;
    private String homeTeamName;
    private String awayTeamName;
    private Integer homeTeamId;
    private Integer awayTeamId;
    private String gameResult;
    private String stadium;
    private String season;
}
