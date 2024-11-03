package com.newbie.baseball.domain.record.dto.res;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class RecordResponseDto {

    private Integer gameId;
    private String stadium;
    private String crowd;
    private String startTime;
    private String endTime;
    private String runTime;
    private List<String> awayScore;
    private List<String> homeScore;
    private String awayStartingPitcher;
    private String homeStartingPitcher;
    private List<String> winningHit;
    private List<String> homeRuns;
    private List<String> doubles;
    private List<String> errors;
    private List<String> stolenBases;
    private List<String> caughtStealing;
    private List<String> doublePlays;
    private List<String> wildPitches;
    private List<String> umpires;
}
