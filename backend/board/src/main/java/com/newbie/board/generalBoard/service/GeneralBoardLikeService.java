package com.newbie.board.generalBoard.service;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GeneralBoardLikeService {

    private final GeneralBoardLikeRepository likeRepository;
    private final GeneralBoardRepository boardRepository;
    private final ActivityRepository activityRepository;

    @Transactional
    public String toggleLike(Long userId, Long boardId) {
        GeneralBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        return likeRepository.findByUserIdAndGeneralBoard(userId, board)
                .map(existingLike -> {
                    // 좋아요 취소 시 기록 삭제
                    likeRepository.delete(existingLike);
                    activityRepository.deleteByUserIdAndBoardIdAndTypeAndBoardType(userId, boardId, "like", "GENERAL_BOARD");
                    return "unliked";
                })
                .orElseGet(() -> {
                    // 좋아요 시 활동 기록 추가
                    GeneralBoardLike newLike = GeneralBoardLike.builder()
                            .generalBoard(board)
                            .userId(userId)
                            .createdAt(LocalDateTime.now())
                            .build();
                    likeRepository.save(newLike);

                    Activity activity = Activity.builder()
                            .userId(userId)
                            .boardId(boardId)
                            .boardType("GENERAL_BOARD")
                            .type("like")
                            .content(board.getTitle() + " 글에 공감합니다")
                            .createdAt(LocalDateTime.now())
                            .build();
                    activityRepository.save(activity);

                    return "liked";
                });
    }

    public int getLikeCount(Long boardId) {
        GeneralBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        return likeRepository.countByGeneralBoard(board);
    }
}
