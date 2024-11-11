package com.newbie.baseball.domain.song.controller;

import com.newbie.baseball.domain.song.dto.res.SongResponseDto;
import com.newbie.baseball.domain.song.service.SongService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
@RequestMapping("/songs")
@Tag(name = "응원송 조회 API")
@RequiredArgsConstructor
public class SongController {

    private final SongService songService;

    @Operation(summary = "팀 이름으로 해당 팀 응원송 조회")
    @GetMapping("/teams")
    public ResponseEntity<List<SongResponseDto>> getTeamSongs(
            @Parameter(description = "팀 이름 [ kia, , lg, doosan, kt, ssg, lotte, hanwha, nc, kiwoom ]", example = "kia") @RequestParam String teamName) {
        List<SongResponseDto> songs = songService.getTeamCheeringSongs(teamName);
        return new ResponseEntity<>(songs, HttpStatus.OK);
    }

    @Operation(summary = "팀, 선수이름으로 해당 선수 응원송 조회")
    @GetMapping("/players")
    public ResponseEntity<SongResponseDto> getPlayerSong(
            @Parameter(description = "팀 이름 [ kia, , lg, doosan, kt, ssg, lotte, hanwha, nc, kiwoom ]", example = "kia") @RequestParam String teamName,
            @Parameter(description = "선수 이름", example = "김도영") @RequestParam String playerName) {
        SongResponseDto song = songService.getPlayerCheeringSong(teamName, playerName);
        return new ResponseEntity<>(song, HttpStatus.OK);
    }
}