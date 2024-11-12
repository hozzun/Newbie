package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoardTag;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface UsedBoardTagRepository extends JpaRepository<UsedBoardTag, Long> {
    Optional<UsedBoardTag> findByName(String name);
}
