package com.newbie.board.generalBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class GeneralBoardUpdateRequestDto {

    private String title;
    private String content;
    private List<String> tags;
}
