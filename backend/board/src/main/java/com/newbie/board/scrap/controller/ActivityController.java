package com.newbie.board.scrap.controller;

import com.newbie.board.scrap.dto.ActivityResponseDto;
import com.newbie.board.scrap.service.ActivityService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/user-activity")
@RequiredArgsConstructor
public class ActivityController {

    private final ActivityService userActivityService;

    /**
     * 사용자의 댓글과 좋아요 정보를 합쳐서 조회합니다.
     * @param userId 사용자 ID
     * @return 사용자 활동 목록
     */
    @Operation(summary = "사용자 활동 조회", description = "사용자가 작성한 댓글과 좋아요 누른 게시글을 조회합니다.")
    @GetMapping("/{userId}")
    public ResponseEntity<List<ActivityResponseDto>> getUserActivities(
            @PathVariable @Parameter(description = "사용자 ID") Long userId) {
        List<ActivityResponseDto> userActivities = userActivityService.getUserActivities(userId);
        return ResponseEntity.ok(userActivities);
    }

    @Operation(summary = "사용자 활동 삭제", description = "사용자의 활동을 삭제합니다.")
    @DeleteMapping("{activityId}")
    public ResponseEntity<Void> deleteActivity(
            @PathVariable @Parameter(description = "활동 ID") Long activityId,
            Long userId) {

        userActivityService.deleteActivity(activityId, userId);
        return ResponseEntity.noContent().build();
    }
}
