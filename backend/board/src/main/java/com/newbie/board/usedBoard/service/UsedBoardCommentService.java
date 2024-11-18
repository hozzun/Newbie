package com.newbie.board.usedBoard.service;

import com.newbie.board.mypage.dto.UserResponseDto;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import com.newbie.board.usedBoard.dto.UsedBoardCommentRequestDto;
import com.newbie.board.usedBoard.dto.UsedBoardCommentResponseDto;
import com.newbie.board.usedBoard.entity.UsedBoardComment;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.repository.UsedBoardCommentRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
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
public class UsedBoardCommentService {

    private final UsedBoardCommentRepository commentRepository;
    private final UsedBoardRepository usedBoardRepository;
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
    public List<UsedBoardCommentResponseDto> getCommentList(Long boardId) {
        List<UsedBoardComment> usedBoardComments = commentRepository.findAllActiveCommentsByBoardId(boardId);
        return usedBoardComments.stream()
                .filter(usedBoardComment -> usedBoardComment.getParent() == null)
                .map(UsedBoardCommentResponseDto::fromEntity)
                .collect(Collectors.toList());
    }

    /**
     * 댓글을 생성합니다.
     * @param requestDto
     * @return
     */
    @Transactional
    public UsedBoardCommentResponseDto createComment(UsedBoardCommentRequestDto requestDto, String memberId) {
        Long userId = Long.valueOf(memberId);
        UsedBoard usedBoard = usedBoardRepository.findById(requestDto.getBoardId())
                .orElseThrow(() -> new RuntimeException("Board not found"));

        ResponseEntity<UserResponseDto> responseDto = getUserProfile(userId);

        UsedBoardComment comment = UsedBoardComment.builder()
                .content(requestDto.getContent())
                .createdAt(LocalDateTime.now())
                .profile(responseDto.getBody().getProfileImage())
                .userName(responseDto.getBody().getNickname())
                .userId(userId)
                .usedBoard(usedBoard)
                .isDeleted("N")
                .build();

        if (requestDto.getParentId() != null) {
            UsedBoardComment parentComment = commentRepository.findById(requestDto.getParentId())
                    .orElseThrow(() -> new RuntimeException("Parent comment not found"));
            comment.setParent(parentComment);
        }

        UsedBoardComment savedComment = commentRepository.save(comment);

        Activity activity = Activity.builder()
                .userId(userId)
                .boardType("USED_BOARD")
                .type("comment")
                .boardId(requestDto.getBoardId())
                .content(requestDto.getContent())
                .createdAt(LocalDateTime.now())
                .build();
        activityRepository.save(activity);

        return UsedBoardCommentResponseDto.fromEntity(savedComment);
    }

    /**
     * 댓글을 삭제합니다.
     * @param commentId
     * @param memberId
     */
    @Transactional
    public void deleteComment(Long commentId, String memberId) {
        Long userId = Long.valueOf(memberId);
        UsedBoardComment usedBoardComment = commentRepository.findById(commentId)
                .orElseThrow(() -> new RuntimeException("Comment not found"));

        if (!usedBoardComment.getUserId().equals(userId)) {
            throw new RuntimeException("You do not have permission to delete this comment.");
        }

        UsedBoardComment updatedUsedBoardComment = usedBoardComment.toBuilder()
                .isDeleted("Y")
                .build();

        commentRepository.save(updatedUsedBoardComment);
    }

    private ResponseEntity<UserResponseDto> getUserProfile(Long userId) {
        String url = userServerDomain + ":" + userPort + "/api/v1/user/users/" + userId;
        return restTemplate.getForEntity(url, UserResponseDto.class);
    }
}
