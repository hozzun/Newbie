package com.newbie.board.scrap.dto;

import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@Builder
public class ScrapResponseDto {

    private Long id;
    private Long userId;
    private Long boardId;
    private String boardType;
    private String boardTitle;
    private String content;
    private String imageUrl;
    private String username;
    private int commentCount;
    private int likeCount;
    private int scrapCount;
    private LocalDateTime createdAt;
}
