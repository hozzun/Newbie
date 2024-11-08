package com.newbie.auth.member.controller;

import com.newbie.auth.member.dto.event.PlayerLikeEventDto;
import com.newbie.auth.member.service.PlayerLikeService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequiredArgsConstructor
@Tag(name = "선수 좋아요 API")
@RequestMapping("/players/like")
public class PlayerLikeController {

    private final PlayerLikeService playerLikeService;

    @Operation(summary = "선수 좋아요 및 취소 API")
    @PostMapping
    public ResponseEntity<String> likePlayer(@RequestBody PlayerLikeEventDto eventDto) {
        playerLikeService.toggleLike(eventDto.getMemberId(), eventDto.getPlayerId());
        return ResponseEntity.ok("좋아요 상태가 변경되었습니다.");
    }
}