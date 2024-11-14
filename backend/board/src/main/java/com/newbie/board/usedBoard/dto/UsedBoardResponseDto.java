package com.newbie.board.usedBoard.dto;


import com.newbie.board.usedBoard.entity.UsedBoard;
import lombok.AllArgsConstructor;
import lombok.Data;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
public class UsedBoardResponseDto {
    private Long id;
    private String title;
    private String content;
    private Integer price;
    private String region;
    private LocalDateTime createdAt;

    public UsedBoardResponseDto(UsedBoard usedBoard) {
        this.id = usedBoard.getId();
        this.title = usedBoard.getTitle();
        this.content = usedBoard.getContent();
        this.price = usedBoard.getPrice();
        this.region = usedBoard.getRegion();
        this.createdAt = usedBoard.getCreatedAt();
    }
}