package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface GeneralBoardCommentRepository extends JpaRepository<GeneralBoardComment, Long> {
    int countByGeneralBoardIdAndIsDeleted(Long boardId, String isDeleted);

    @Query("SELECT c FROM GeneralBoardComment c WHERE c.generalBoard.id = :boardId AND c.isDeleted = 'N'")
    List<GeneralBoardComment> findAllActiveCommentsByBoardId(@Param("boardId") Long boardId);

    @Query("SELECT c FROM GeneralBoardComment c WHERE c.userId = :userId AND c.isDeleted = 'N'")
    List<GeneralBoardComment> findByUserIdAndIsDeleted(@Param("userId") Long userId);

}
