package com.newbie.board.generalBoard.dto;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class GeneralBoardResponseDto {

    private Long id;
    private Long userId;
    private String userName;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> tags;

    private int commentCount;
    private int likeCount;
    private int scrapCount;
    private int viewCount;

    private String profile;
    private boolean isLikedByUser;
    private boolean isScrapedByUser;

}
