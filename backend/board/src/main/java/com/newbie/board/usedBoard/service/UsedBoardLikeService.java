package com.newbie.board.usedBoard.service;


import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.entity.Activity;
import com.newbie.board.scrap.repository.ActivityRepository;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardLike;
import com.newbie.board.usedBoard.repository.UsedBoardLikeRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class UsedBoardLikeService {

    private final UsedBoardLikeRepository likeRepository;
    private final UsedBoardRepository boardRepository;
    private final ActivityRepository activityRepository;

    @Transactional
    public String toggleLike(String memberId, Long boardId) {
        Long userId = Long.valueOf(memberId);
        UsedBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        return likeRepository.findByUserIdAndUsedBoard(userId, board)
                .map(existingLike -> {
                    likeRepository.delete(existingLike);
                    activityRepository.deleteByUserIdAndBoardIdAndTypeAndBoardType(userId, boardId, "like", "USED_BOARD");
                    return "unliked";
                })
                .orElseGet(() -> {
                    UsedBoardLike newLike = UsedBoardLike.builder()
                            .usedBoard(board)
                            .userId(userId)
                            .createdAt(LocalDateTime.now())
                            .build();
                    likeRepository.save(newLike);

                    Activity activity = Activity.builder()
                            .userId(userId)
                            .boardType("USED_BOARD") // 게시판 유형 설정
                            .type("like")
                            .content(board.getTitle() + " 글에 공감합니다")
                            .createdAt(LocalDateTime.now())
                            .build();
                    activityRepository.save(activity);
                    return "liked";
                });
    }
}
