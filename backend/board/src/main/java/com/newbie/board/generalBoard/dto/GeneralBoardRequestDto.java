package com.newbie.board.generalBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralBoardRequestDto {

    private int userId;
    private String userName;
    private String title;
    private String content;
    private List<String> tags;
}
