package com.newbie.baseball.domain.record.dto.res;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class TeamScoreDetailDto {

    private Integer teamId;
    private List<String> scores;
    private String run;
    private String hit;
    private String error;
    private String baseOnBalls;
}
