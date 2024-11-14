package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoardComment;
import com.newbie.board.usedBoard.entity.UsedBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface UsedBoardCommentRepository extends JpaRepository<UsedBoardComment, Long> {
    List<UsedBoardComment> findByUsedBoardAndIsDeletedOrderByCreatedAtAsc(UsedBoard usedBoard, String isDeleted);

    @Query("SELECT c FROM UsedBoardComment c WHERE c.usedBoard.id = :boardId AND c.isDeleted = 'N' ORDER BY c.createdAt ASC")
    List<UsedBoardComment> findAllActiveCommentsByBoardId(Long boardId);
}
