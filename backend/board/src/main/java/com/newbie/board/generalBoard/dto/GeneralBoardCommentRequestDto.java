package com.newbie.board.generalBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class GeneralBoardCommentRequestDto {

    private Long boardId;
    private Long parentId;
    private String content;
}
