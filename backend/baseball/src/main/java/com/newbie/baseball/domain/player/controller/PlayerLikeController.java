package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;
import com.newbie.baseball.domain.player.service.PlayerLikeService;
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

    @Operation(summary = "선수 좋아요 및 취소 API")
    @PostMapping("/{playerId}")
    public ResponseEntity<String> likePlayer(
            // 추후 서블렛 리퀘스트 추가
            @Parameter(description = "선수 ID", example = "1") @PathVariable Integer playerId,
            @RequestHeader("X-User-ID") Long contextUserId) {
        // JWT 토큰에서 memberId를 추출하는 로직
//        Long memberId = extractMemberIdFromToken(request);
//        Long memberId = 1L;
        playerLikeService.toggleLike(contextUserId, playerId);
        return ResponseEntity.ok("좋아요 상태가 변경되었습니다.");
    }

    // JWT 토큰에서 memberId 추출 예시 메서드
    private Long extractMemberIdFromToken(HttpServletRequest request) {
        // JWT에서 memberId를 추출하는 로직을 구현합니다.
        return 1L; // 예제용으로 반환한 ID. 실제로는 JWT 토큰 파싱하여 memberId 추출 필요
    }

    @Operation(summary = "자신이 해당 선수 좋아요하고 있는지 여부")
    @GetMapping("/{memberId}/{playerId}")
    public ResponseEntity<LikePlayerResponseDto> getLikedPlayer(@PathVariable Long memberId, @PathVariable Integer playerId) {
        return ResponseEntity.ok(playerLikeService.getLikedPlayer(memberId, playerId));
    }

    @Operation(summary = "현재 자신이 좋아요 중인 선수들 목록")
    @GetMapping("/{memberId}")
    public ResponseEntity<List<LikePlayerResponseDto>> getLikedPlayersByMember(@PathVariable Long memberId) {
        return ResponseEntity.ok(playerLikeService.getLikedPlayersByMember(memberId));
    }
}