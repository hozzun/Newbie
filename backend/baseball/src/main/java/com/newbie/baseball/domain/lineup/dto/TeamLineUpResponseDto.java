package com.newbie.baseball.domain.lineup.dto;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class TeamLineUpResponseDto {

    private Integer gameId;
    private Integer teamId;
    private String teamName;
    private List<LineUpResponseDto> players;
}