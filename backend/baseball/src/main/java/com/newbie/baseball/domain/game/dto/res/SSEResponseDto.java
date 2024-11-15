package com.newbie.baseball.domain.game.dto.res;

import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SSEResponseDto {

    private GameResponseDto game;
//    private RecordResponseDto record;
}
