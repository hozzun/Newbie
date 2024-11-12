package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import java.util.List;

public interface UsedBoardRepository extends JpaRepository<UsedBoard, Long> {

    @Query(value = "SELECT u.* FROM used_board u " +
            "JOIN user ON u.user_id = user.id " +
            "JOIN used_board_tags ubt ON u.id = ubt.used_board_id " +
            "JOIN tag t ON ubt.tag_id = t.id " +
            "WHERE (:keyword IS NULL OR :keyword = '' " +
            "OR MATCH(u.title) AGAINST(:keyword IN NATURAL LANGUAGE MODE) " +
            "OR MATCH(user.userName) AGAINST(:keyword IN NATURAL LANGUAGE MODE) " +
            "OR MATCH(t.name) AGAINST(:keyword IN NATURAL LANGUAGE MODE))",
            nativeQuery = true)
    List<UsedBoard> searchByKeyword(@Param("keyword") String keyword);

    @Query("SELECT u FROM UsedBoard u WHERE u.isDeleted = 'N' ORDER BY u.createdAt DESC")
    List<UsedBoard> findAllByOrderByCreatedAtDesc();
}

