package com.newbie.baseball.domain.game.dto.res;

import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class SSEResponseDto {

    private GameResponseDto game;
//    private RecordResponseDto record;
}
