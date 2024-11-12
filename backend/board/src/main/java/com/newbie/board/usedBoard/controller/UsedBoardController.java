package com.newbie.board.usedBoard.controller;


import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.service.UsedBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@RequestMapping("/used-board")
public class UsedBoardController {

    private final UsedBoardService usedBoardService;

    @PostMapping("/create")
    public void createUsedBoard(@RequestBody UsedBoardRequestDto usedBoardDto) {
        usedBoardService.createUsedBoard(usedBoardDto);
    }

    @GetMapping("/")
    public List<UsedBoard> boardList(@RequestParam(required = false) String keyword) {
        return usedBoardService.getBoardList(keyword);
    }


}
