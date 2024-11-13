package com.newbie.board.scrap.service;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.dto.ActivityResponseDto;
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

    /**
     * 사용자 활동(댓글, 좋아요)을 합쳐 반환합니다.
     * @param userId 사용자 ID
     * @return 사용자 활동 목록
     */
    @Transactional
    public List<ActivityResponseDto> getUserActivities(Long userId) {
        List<ActivityResponseDto> activities = new ArrayList<>();

        // GeneralBoard의 댓글 정보 가져오기
        List<GeneralBoardComment> generalComments = generalCommentRepository.findByUserIdAndIsDeleted(userId);
        activities.addAll(generalComments.stream()
                .map(comment -> ActivityResponseDto.builder()
                        .type("comment")
                        .boardId(comment.getGeneralBoard().getId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .build())
                .collect(Collectors.toList()));

        // GeneralBoard의 좋아요 정보 가져오기
        List<GeneralBoard> likedGeneralBoards = generalLikeRepository.findBoardsLikedByUser(userId);
        activities.addAll(likedGeneralBoards.stream()
                .map(board -> ActivityResponseDto.builder()
                        .type("like")
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .createdAt(board.getCreatedAt())
                        .build())
                .collect(Collectors.toList()));

        // UsedBoard의 댓글 정보 가져오기
        List<UsedBoardComment> usedComments = usedCommentRepository.findByUserIdAndIsDeleted(userId);
        activities.addAll(usedComments.stream()
                .map(comment -> ActivityResponseDto.builder()
                        .type("comment")
                        .boardId(comment.getUsedBoard().getId())
                        .content(comment.getContent())
                        .createdAt(comment.getCreatedAt())
                        .build())
                .collect(Collectors.toList()));

        // UsedBoard의 좋아요 정보 가져오기
        List<UsedBoard> likedUsedBoards = usedLikeRepository.findBoardsLikedByUser(userId);
        activities.addAll(likedUsedBoards.stream()
                .map(board -> ActivityResponseDto.builder()
                        .type("like")
                        .boardId(board.getId())
                        .title(board.getTitle())
                        .createdAt(board.getCreatedAt())
                        .build())
                .collect(Collectors.toList()));

        return activities;
    }
}