package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface GeneralBoardCommentRepository extends JpaRepository<GeneralBoardComment, Long> {
}
