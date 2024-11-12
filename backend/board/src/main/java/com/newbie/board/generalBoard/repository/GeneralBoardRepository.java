package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardComment;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GeneralBoardRepository extends JpaRepository<GeneralBoard, Long> {
    @Query(value = "SELECT g.* FROM general_board g " +
            "JOIN user ON g.user_id = user.id " +
            "JOIN general_board_tags gbt ON g.id = gbt.general_board_id " +
            "JOIN general_tag t ON gbt.tag_id = t.id " +
            "WHERE (:keyword IS NULL OR :keyword = '' " +
            "OR MATCH(g.title) AGAINST(:keyword IN NATURAL LANGUAGE MODE) " +
            "OR MATCH(user.userName) AGAINST(:keyword IN NATURAL LANGUAGE MODE) " +
            "OR MATCH(t.name) AGAINST(:keyword IN NATURAL LANGUAGE MODE))",
            nativeQuery = true)
    List<GeneralBoard> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT g FROM GeneralBoard g WHERE g.isDeleted = 'N' ORDER BY g.createdAt DESC")
    List<GeneralBoard> findAllByOrderByCreatedAtDesc();
}
