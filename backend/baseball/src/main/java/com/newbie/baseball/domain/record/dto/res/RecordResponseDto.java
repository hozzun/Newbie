package com.newbie.baseball.domain.record.dto.res;

import lombok.Builder;
import lombok.Data;

import java.util.List;

@Builder
@Data
public class RecordResponseDto {

    private Integer gameId;
    private Integer inningCount;
    private List<TeamScoreDetailDto> teamScoreDetails;
    private GameResultDetailDto gameResultDetails;
}
