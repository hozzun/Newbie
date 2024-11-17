package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;
import com.newbie.baseball.domain.player.service.PlayerLikeService;
import io.swagger.v3.oas.annotations.Hidden;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequiredArgsConstructor
@Tag(name = "선수 좋아요 API [ 추후 토큰쪽 되면 다시 해야함, 지금 memberId 1로 임의 고정]")
@RequestMapping("/players/like")
public class PlayerLikeController {

    private final PlayerLikeService playerLikeService;

    @Operation(summary = "선수 좋아요 및 취소 API", parameters = {})
    @PostMapping("/{playerId}")
    public ResponseEntity<String> likePlayer(
            // 추후 서블렛 리퀘스트 추가
            @Parameter(description = "선수 ID", example = "1") @PathVariable Integer playerId,
            @RequestHeader("X-User-ID") Long memberId) {
        playerLikeService.toggleLike(memberId, playerId);
        return ResponseEntity.ok("좋아요 상태가 변경되었습니다.");
    }

    @Operation(summary = "자신이 해당 선수 좋아요하고 있는지 여부", parameters = {})
    @GetMapping("/{playerId}")
    public ResponseEntity<LikePlayerResponseDto> getLikedPlayer(@PathVariable Integer playerId,
                                                                @RequestHeader("X-User-ID") Long memberId) {
        return ResponseEntity.ok(playerLikeService.getLikedPlayer(memberId, playerId));
    }

    @Operation(summary = "현재 자신이 좋아요 중인 선수들 목록", parameters = {})
    @GetMapping
    public ResponseEntity<List<LikePlayerResponseDto>> getLikedPlayersByMember(@RequestHeader("X-User-ID") Long memberId) {
        return ResponseEntity.ok(playerLikeService.getLikedPlayersByMember(memberId));
    }
}