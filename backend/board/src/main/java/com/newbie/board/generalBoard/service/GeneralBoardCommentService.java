package com.newbie.board.generalBoard.service;

import com.newbie.board.config.BoardMileageProducer;
import com.newbie.board.generalBoard.dto.GeneralBoardCommentRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardCommentResponseDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GeneralBoardCommentService {

    private final GeneralBoardCommentRepository commentRepository;
    private final GeneralBoardRepository generalBoardRepository;
    private final BoardMileageProducer mileageProducer;
    private final ActivityRepository activityRepository;

    /**
     * 댓글 목록을 계층적으로 가져옵니다.
     * @param boardId
     * @return
     */
    public List<GeneralBoardCommentResponseDto> getCommentList(Long boardId) {
        List<GeneralBoardComment> generalBoardComments = commentRepository.findAllActiveCommentsByBoardId(boardId);
        return generalBoardComments.stream()
                .filter(comment -> comment.getParent() == null)
                .map(GeneralBoardCommentResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 댓글을 생성합니다.
     * @param requestDto
     * @param userId
     * @return
     */
    @Transactional
    public GeneralBoardCommentResponseDto createComment(GeneralBoardCommentRequestDto requestDto, int userId) {
        GeneralBoard generalBoard = generalBoardRepository.findById(requestDto.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        GeneralBoardComment comment = GeneralBoardComment.builder()
                .content(requestDto.getContent())
                .createdAt(LocalDateTime.now())
                .userId((long) userId)
                .generalBoard(generalBoard)
                .isDeleted("N")
                .build();

        if (requestDto.getParentId() != null) {
            GeneralBoardComment parentComment = commentRepository.findById(requestDto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParent(parentComment);
        }

        GeneralBoardComment savedComment = commentRepository.save(comment);
        mileageProducer.sendMileageUpdate(userId, 100, "댓글 작성");

        Activity activity = Activity.builder()
                .userId((long) userId)
                .boardId(requestDto.getBoardId())
                .boardType("GENERAL_BOARD")
                .type("comment")
                .content(requestDto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        activityRepository.save(activity);
        return GeneralBoardCommentResponseDto.fromEntity(savedComment);
    }

    /**
     * 댓글을 삭제합니다.
     * @param commentId
     * @param userId
     */
    @Transactional
    public void deleteComment(Long commentId, Long userId) {
        GeneralBoardComment generalBoardComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!generalBoardComment.getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to delete this comment.");
        }

        generalBoardComment.setIsDeleted("Y");
        commentRepository.save(generalBoardComment);
        activityRepository.deleteByUserIdAndBoardIdAndTypeAndBoardType(userId, generalBoardComment.getGeneralBoard().getId(), "comment", "GENERAL_BOARD");
    }
}
