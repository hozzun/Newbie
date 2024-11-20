package com.newbie.board.usedBoard.dto;


import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@Builder
@AllArgsConstructor
public class UsedBoardCommentRequestDto {

    private Long boardId;
    private Long parentId;
    private String content;

}
