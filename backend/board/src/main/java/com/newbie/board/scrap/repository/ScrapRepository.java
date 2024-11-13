package com.newbie.board.scrap.repository;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.scrap.entity.Scrap;
import com.newbie.board.usedBoard.entity.UsedBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ScrapRepository extends JpaRepository<Scrap, Long> {
    List<Scrap> findByUserId(Long userId);
    Optional<Scrap> findByUserIdAndGeneralBoard(Long userId, GeneralBoard generalBoard);
    Optional<Scrap> findByUserIdAndUsedBoard(Long userId, UsedBoard usedBoard);
    int countByGeneralBoardId(Long boardId);
    int countByUsedBoardId(Long boardId);
}

