package com.newbie.baseball.domain.record.controller;

import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import com.newbie.baseball.domain.record.service.RecordService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Tag(name = "경기결과 조회 API")
@RequestMapping("/records")
public class RecordController {

    private final RecordService recordService;

    @Operation(summary = "gameId로 경기결과 조회")
    @GetMapping("/{gameId}")
    public RecordResponseDto getRecord(@PathVariable Integer gameId) {
        return recordService.getRecordByGameId(gameId);
    }
}
