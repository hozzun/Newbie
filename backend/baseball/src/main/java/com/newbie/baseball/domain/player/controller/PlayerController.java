package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@RequiredArgsConstructor
@RestController
@Tag(name = "선수정보 조회 API")
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Operation(summary = "ID로 선수조회")
    @GetMapping("/{id}")
    public PlayerResponseDto getPlayerById(@PathVariable Integer id) {
        return playerService.getPlayerById(id);
    }
}