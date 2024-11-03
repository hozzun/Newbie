package com.newbie.baseball.domain.team.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class TeamResponseDto {

    private Integer id;
    private String teamName;
    private String teamLogo;
}