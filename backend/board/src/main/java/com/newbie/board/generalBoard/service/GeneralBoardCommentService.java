package com.newbie.board.generalBoard.service;

import com.newbie.board.config.BoardMileageProducer;
import com.newbie.board.generalBoard.dto.GeneralBoardCommentRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardCommentResponseDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.mypage.dto.UserResponseDto;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

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
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${user.server.domain}")
    private String userServerDomain;

    @Value("${user.server.port}")
    private String userPort;

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
    public GeneralBoardCommentResponseDto createComment(GeneralBoardCommentRequestDto requestDto, String userId) {
        GeneralBoard generalBoard = generalBoardRepository.findById(requestDto.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        ResponseEntity<UserResponseDto> responseDto = getUserProfile(Long.valueOf(userId));

        GeneralBoardComment comment = GeneralBoardComment.builder()
                .content(requestDto.getContent())
                .createdAt(LocalDateTime.now())
                .userId(Long.valueOf(userId))
                .userName(responseDto.getBody().getNickname())
                .profile(responseDto.getBody().getProfileImage())
                .generalBoard(generalBoard)
                .isDeleted("N")
                .build();

        if (requestDto.getParentId() != null) {
            GeneralBoardComment parentComment = commentRepository.findById(requestDto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParent(parentComment);
        }

        GeneralBoardComment savedComment = commentRepository.save(comment);
        mileageProducer.sendMileageUpdate(Integer.parseInt(userId), 100, "댓글 작성");

        Activity activity = Activity.builder()
                .userId(Long.valueOf(userId))
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
     * @param memberId
     */
    @Transactional
    public void deleteComment(Long commentId, String memberId) {
        Long userId = Long.valueOf(memberId);
        GeneralBoardComment generalBoardComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!generalBoardComment.getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to delete this comment.");
        }

        generalBoardComment.setIsDeleted("Y");
        commentRepository.save(generalBoardComment);
        activityRepository.deleteByUserIdAndBoardIdAndTypeAndBoardType(userId, generalBoardComment.getGeneralBoard().getId(), "comment", "GENERAL_BOARD");
    }

    private ResponseEntity<UserResponseDto> getUserProfile(Long userId) {
        String url = userServerDomain + ":" + userPort + "/api/v1/user/users/" + userId;
        return restTemplate.getForEntity(url, UserResponseDto.class);
    }
}
