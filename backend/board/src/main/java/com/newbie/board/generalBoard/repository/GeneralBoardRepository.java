package com.newbie.board.generalBoard.repository;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
public interface GeneralBoardRepository extends JpaRepository<GeneralBoard, Long> {
    @Query(value = "SELECT * FROM general_board g " +
            "WHERE g.is_deleted = 'N' " +
            "AND MATCH(g.user_name) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<GeneralBoard> searchByUsername(@Param("keyword") String keyword);

    @Query(value = "SELECT * FROM general_board g " +
            "WHERE g.is_deleted = 'N' " +
            "AND MATCH(g.title) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<GeneralBoard> searchByTitle(@Param("keyword") String keyword);

    @Query(value = "SELECT g.* FROM general_board g " +
            "JOIN general_board_tags gbt ON g.id = gbt.general_board_id " +
            "JOIN general_tag t ON gbt.tag_id = t.id " +
            "WHERE g.is_deleted = 'N' " +
            "AND MATCH(t.name) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<GeneralBoard> searchByTag(@Param("keyword") String keyword);

    @Query("SELECT u FROM GeneralBoard u WHERE u.isDeleted = 'N' ORDER BY u.createdAt DESC")
    List<GeneralBoard> findAllByOrderByCreatedAtDesc();

    @Query("SELECT u FROM GeneralBoard u WHERE u.userId = :userId AND u.isDeleted = 'N'")
    List<GeneralBoard> findActiveByUserId(@Param("userId") Long userId);


}
