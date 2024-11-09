package com.newbie.baseball.domain.player.controller;

import com.newbie.baseball.domain.player.service.PlayerLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import jakarta.servlet.http.HttpServletRequest;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

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
            @Parameter(description = "선수 ID", example = "1") @PathVariable Integer playerId) {
        // JWT 토큰에서 memberId를 추출하는 로직
//        Long memberId = extractMemberIdFromToken(request);
        Long memberId = 1L;
        playerLikeService.toggleLike(memberId, playerId);
        return ResponseEntity.ok("좋아요 상태가 변경되었습니다.");
    }

    // JWT 토큰에서 memberId 추출 예시 메서드
    private Long extractMemberIdFromToken(HttpServletRequest request) {
        // JWT에서 memberId를 추출하는 로직을 구현합니다.
        return 1L; // 예제용으로 반환한 ID. 실제로는 JWT 토큰 파싱하여 memberId 추출 필요
    }
}