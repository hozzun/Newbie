package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface UsedBoardLikeRepository extends JpaRepository<UsedBoardLike, Long> {

    Optional<UsedBoardLike> findByUserIdAndUsedBoard(Long userId, UsedBoard usedBoard);
    int countByUsedBoardId(Long usedBoardId);
    @Query("SELECT l.usedBoard FROM UsedBoardLike l WHERE l.userId = :userId")
    List<UsedBoard> findBoardsLikedByUser(@Param("userId") Long userId);
}
