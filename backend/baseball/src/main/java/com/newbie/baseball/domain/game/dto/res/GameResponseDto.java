package com.newbie.baseball.domain.game.dto.res;

import jakarta.persistence.Column;
import lombok.Builder;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Builder
@Data
public class GameResponseDto implements Serializable {

    @Serial
    private static final long serialVersionUID = 1L;

    private Integer id;
    private String date;
    private String time;
    private String homeTeamName;
    private String awayTeamName;
    private Integer homeTeamId;
    private Integer awayTeamId;
    private Integer homeScore;
    private Integer awayScore;
    private String gameResult;
    private String stadium;
    private String season;
    private String awayStartingPitcher;
    private String homeStartingPitcher;
}