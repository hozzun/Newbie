package com.newbie.board.generalBoard.dto;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
public class GeneralBoardResponseDto {

    private Long id;
    private Long userId;
    private String title;
    private String content;
    private String imageUrl;
    private LocalDateTime createdAt;
    private LocalDateTime updatedAt;
    private List<String> tags;

    public GeneralBoardResponseDto(GeneralBoard generalBoard) {
        this.id = generalBoard.getId();
        this.userId = generalBoard.getId();
        this.title = generalBoard.getTitle();
        this.content = generalBoard.getContent();
        this.imageUrl = generalBoard.getImageUrl();
        this.createdAt = generalBoard.getCreatedAt();
        this.updatedAt = generalBoard.getUpdatedAt();
        this.tags = generalBoard.getGeneralBoardTags().stream()
                .map(GeneralBoardTag::getName)
                .collect(Collectors.toList());
    }
}
