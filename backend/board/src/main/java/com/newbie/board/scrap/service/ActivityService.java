package com.newbie.board.scrap.service;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.dto.ActivityResponseDto;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardComment;
import com.newbie.board.usedBoard.repository.UsedBoardCommentRepository;
import com.newbie.board.usedBoard.repository.UsedBoardLikeRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ActivityService {
    private final GeneralBoardCommentRepository generalCommentRepository;
    private final GeneralBoardLikeRepository generalLikeRepository;
    private final GeneralBoardRepository generalBoardRepository;
    private final UsedBoardCommentRepository usedCommentRepository;
    private final UsedBoardLikeRepository usedLikeRepository;
    private final UsedBoardRepository usedBoardRepository;
    private final ActivityRepository activityRepository;

    /**
     * 사용자 활동(댓글, 좋아요)을 합쳐 반환합니다.
     * @param userId 사용자 ID
     * @return 사용자 활동 목록
     */
    @Transactional
    public List<ActivityResponseDto> getUserActivities(Long userId) {
        List<Activity> activities = activityRepository.findByUserId(userId);

        return activities.stream()
                .map(activity -> ActivityResponseDto.builder()
                        .type(activity.getType())
                        .boardId(activity.getBoardId())
                        .content(activity.getContent())
                        .createdAt(activity.getCreatedAt())
                        .build())
                .collect(Collectors.toList());

    }

    @Transactional
    public void deleteActivity(Long activityId, Long userId) {
        activityRepository.deleteByIdAndUserId(activityId, userId);
    }
}