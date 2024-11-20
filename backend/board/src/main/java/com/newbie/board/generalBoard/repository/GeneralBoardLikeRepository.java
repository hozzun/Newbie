package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;
import java.util.Optional;

public interface GeneralBoardLikeRepository extends JpaRepository<GeneralBoardLike, Long> {
    Optional<GeneralBoardLike> findByUserIdAndGeneralBoard(Long userId, GeneralBoard generalBoard);
    int countByGeneralBoard(GeneralBoard generalBoard);
    int countByGeneralBoardId(Long boardId);

    @Query("SELECT l.generalBoard FROM GeneralBoardLike l WHERE l.userId = :userId")
    List<GeneralBoard> findBoardsLikedByUser(@Param("userId") Long userId);

    boolean existsByGeneralBoardIdAndUserId(Long generalBoardId, Long userId);
}

