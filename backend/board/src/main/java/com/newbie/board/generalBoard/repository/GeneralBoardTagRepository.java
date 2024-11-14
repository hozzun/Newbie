package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import com.newbie.board.usedBoard.entity.UsedBoardTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface GeneralBoardTagRepository extends JpaRepository<GeneralBoardTag, Long> {
    Optional<GeneralBoardTag> findByName(String name);

}
