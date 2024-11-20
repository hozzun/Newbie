package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.service.PlayerService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.PageRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RequiredArgsConstructor
@RestController
@Tag(name = "선수정보 조회 API")
@RequestMapping("/players")
public class PlayerController {

    private final PlayerService playerService;

    @Operation(summary = "playerId로 선수조회")
    @GetMapping("/player/{playerId}")
    public ResponseEntity<PlayerResponseDto> getPlayerById(
            @Parameter(description = "조회할 선수의 ID", example = "1") @PathVariable("playerId") Integer playerId) {
        PlayerResponseDto player = playerService.getPlayerById(playerId);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }

    @Operation(summary = "팀별 선수 조회 (옵션: 포지션 및 정렬 필터)")
    @GetMapping("/team/{teamId}")
    public ResponseEntity<Page<PlayerResponseDto>> getPlayersByTeam(
            @Parameter(description = "조회할 팀의 ID [ 1 ~ 10 ]", example = "1") @PathVariable("teamId") Integer teamId,
            @Parameter(description = "조회할 선수의 포지션(옵션) [투수, 포수, 내야수, 외야수]", example = "투수") @RequestParam(value = "position", required = false) String position,
            @Parameter(description = "조회할 정렬기준(옵션) [likeCount(좋아요 순), backNumber(등번호 순)]", example = "likeCount") @RequestParam(value = "sortBy", required = false) String sortBy,
            @Parameter(description = "페이지", example = "0") @RequestParam(value = "page", defaultValue = "0") int page,
            @Parameter(description = "출력 개수", example = "5") @RequestParam(value = "size", defaultValue = "5") int size) {

        // PageRequest 생성 - 정렬 조건이 필요하면 여기에 수동으로 설정
        PageRequest pageRequest = PageRequest.of(page, size);

        Page<PlayerResponseDto> players = playerService.getPlayersByTeam(teamId, position, sortBy, pageRequest);
        return new ResponseEntity<>(players, HttpStatus.OK);
    }

    @Operation(summary = "팀 ID, 등번호로 해당 선수조회")
    @GetMapping("/photos/{teamId}/{backNumber}")
    public ResponseEntity<PlayerResponseDto> getPlayerByTeamIdAndBackNumber(
            @Parameter(description = "조회할 팀의 ID [1 ~ 10]", example = "1") @PathVariable("teamId") Integer teamId,
            @Parameter(description = "조회할 선수의 등번호", example = "5") @PathVariable("backNumber") String backNumber) {
        PlayerResponseDto player = playerService.getPlayerByTeamIdAndBackNumber(teamId, backNumber);
        return new ResponseEntity<>(player, HttpStatus.OK);
    }
}