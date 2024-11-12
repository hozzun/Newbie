package com.newbie.board.generalBoard.service;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;

@Service
@RequiredArgsConstructor
public class GeneralBoardLikeService {

    private final GeneralBoardLikeRepository likeRepository;
    private final GeneralBoardRepository boardRepository;

    @Transactional
    public String toggleLike(Long userId, Long boardId) {
        GeneralBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));

        return likeRepository.findByUserIdAndGeneralBoard(userId, board)
                .map(existingLike -> {
                    likeRepository.delete(existingLike);
                    return "unliked";
                })
                .orElseGet(() -> {
                    GeneralBoardLike newLike = GeneralBoardLike.builder()
                            .generalBoard(board)
                            .userId(userId)
                            .createdAt(LocalDateTime.now())
                            .build();
                    likeRepository.save(newLike);
                    return "liked";
                });
    }

    public int getLikeCount(Long boardId) {
        GeneralBoard board = boardRepository.findById(boardId)
                .orElseThrow(() -> new RuntimeException("Board not found"));
        return likeRepository.countByGeneralBoard(board);
    }
}
