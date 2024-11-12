package com.newbie.board.usedBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class UsedBoardUpdateRequestDto {

    private String title;
    private String content;
    private Integer price;
    private String region;
}
