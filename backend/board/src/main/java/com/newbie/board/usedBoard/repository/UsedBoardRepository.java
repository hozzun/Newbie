package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoard;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface UsedBoardRepository extends JpaRepository<UsedBoard, Long> {

    @Query(value = "SELECT u.* FROM used_board u " +
            "WHERE u.is_deleted = 'N' " +
            "AND MATCH(u.title) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<UsedBoard> searchByTitle(@Param("keyword") String keyword);

    @Query(value = "SELECT u.* FROM used_board u " +
            "JOIN user ON u.user_id = user.id " +
            "WHERE u.is_deleted = 'N' " +
            "AND MATCH(user.user_name) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<UsedBoard> searchByUsername(@Param("keyword") String keyword);

    @Query(value = "SELECT u.* FROM used_board u " +
            "JOIN used_board_tags ubt ON u.id = ubt.used_board_id " +
            "JOIN tag t ON ubt.tag_id = t.id " +
            "WHERE u.is_deleted = 'N' " +
            "AND MATCH(t.name) AGAINST(:keyword IN NATURAL LANGUAGE MODE)",
            nativeQuery = true)
    List<UsedBoard> searchByTag(@Param("keyword") String keyword);

    @Query("SELECT u FROM UsedBoard u WHERE u.isDeleted = 'N' ORDER BY u.createdAt DESC")
    List<UsedBoard> findAllByOrderByCreatedAtDesc();

    @Query("SELECT u FROM UsedBoard u WHERE u.userId = :userId AND u.isDeleted = 'N'")
    List<UsedBoard> findActiveByUserId(@Param("userId") Long userId);

    @Modifying
    @Query("UPDATE UsedBoard ub SET ub.isDeleted = 'Y' WHERE ub.userId = :userId AND ub.isDeleted = 'N'")
    void updatePostsAsDeletedByUserId(Long userId);
}
