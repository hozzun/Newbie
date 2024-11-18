package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;
import com.newbie.baseball.domain.player.exception.MissingHeaderException;
import com.newbie.baseball.domain.player.service.PlayerLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "선수 좋아요 API")
@RequestMapping("/players/like")
public class PlayerLikeController {

    private final PlayerLikeService playerLikeService;

    @Operation(summary = "선수 좋아요 및 취소 API")
    @PostMapping("/{playerId}")
    public ResponseEntity<String> likePlayer(
            @Parameter(description = "선수 ID", example = "1") @PathVariable Integer playerId,
            @RequestHeader(value = "X-Member-ID", required = false) String userId) {
        if (userId == null) {
            throw new MissingHeaderException();
        }
        Long memberId = Long.valueOf(userId);
        playerLikeService.toggleLike(memberId, playerId);
        return ResponseEntity.ok("좋아요 상태가 변경되었습니다.");
    }

    @Operation(summary = "자신이 해당 선수 좋아요하고 있는지 여부")
    @GetMapping("/{playerId}")
    public ResponseEntity<LikePlayerResponseDto> getLikedPlayer(@PathVariable Integer playerId,
                                                                @RequestHeader(value = "X-Member-ID", required = false) String userId) {
        if (userId == null) {
            throw new MissingHeaderException();
        }
        Long memberId = Long.valueOf(userId);
        return ResponseEntity.ok(playerLikeService.getLikedPlayer(memberId, playerId));
    }

    @Operation(summary = "현재 자신이 좋아요 중인 선수들 목록")
    @GetMapping
    public ResponseEntity<List<LikePlayerResponseDto>> getLikedPlayersByMember(@Parameter(hidden = true) @RequestHeader(value = "X-Member-ID", required = false) String userId) {
        if (userId == null) {
            throw new MissingHeaderException();
        }
        Long memberId = Long.valueOf(userId);
        return ResponseEntity.ok(playerLikeService.getLikedPlayersByMember(memberId));
    }
}