package com.newbie.board.scrap.repository;

import com.newbie.board.scrap.entity.Activity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ActivityRepository extends JpaRepository<Activity, Long> {
    void deleteByIdAndUserId(Long activityId, Long userId);
    void deleteByUserIdAndBoardIdAndTypeAndBoardType(Long userId, Long boardId, String type, String boardType);
    List<Activity> findByUserId(Long userId);
}
