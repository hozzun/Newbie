package com.newbie.board.usedBoard.service;


import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
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

    @Transactional
    public String toggleLike(Long userId, Long boardId) {
        UsedBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        return likeRepository.findByUserIdAndUsedBoard(userId, board)
                .map(existingLike -> {
                    likeRepository.delete(existingLike);
                    return "unliked";
                })
                .orElseGet(() -> {
                    UsedBoardLike newLike = UsedBoardLike.builder()
                            .usedBoard(board)
                            .userId(userId)
                            .createdAt(LocalDateTime.now())
                            .build();
                    likeRepository.save(newLike);
                    return "liked";
                });
    }
}
