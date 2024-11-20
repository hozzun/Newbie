package com.newbie.board.usedBoard.dto;

import com.newbie.board.usedBoard.entity.UsedBoard;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class UsedBoardResponseDto {
    private Long id;
    private Long userId;
    private String userName;
    private String title;
    private String content;
    private Integer price;
    private String region;
    private String imageUrl;
    private String profile;
    private LocalDateTime createdAt;
    private List<String> tags;
    private int likeCount;
    private int commentCount;
    private int scrapCount;
    private int viewCount;

    private boolean isLikedByUser;
    private boolean isScrapedByUser;
}
