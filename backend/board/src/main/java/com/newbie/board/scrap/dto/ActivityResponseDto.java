package com.newbie.board.scrap.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ActivityResponseDto {

    private Long activityId;
    private String type;
    private Long boardId;
    private String content;
    private LocalDateTime createdAt;
}
