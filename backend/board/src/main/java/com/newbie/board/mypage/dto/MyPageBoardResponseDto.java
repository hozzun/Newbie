package com.newbie.board.mypage.dto;

import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@Builder
public class MyPageBoardResponseDto {
    private List<GeneralBoardResponseDto> generalBoards;
    private List<UsedBoardResponseDto> usedBoards;
}

