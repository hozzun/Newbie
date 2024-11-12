package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardLike;
import com.newbie.board.usedBoard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface GeneralBoardLikeRepository extends JpaRepository<GeneralBoardLike, Long> {
    Optional<GeneralBoardLike> findByUserIdAndGeneralBoard(Long userId, GeneralBoard generalBoard);
    int countByGeneralBoard(GeneralBoard generalBoard);
}
