package com.newbie.baseball.domain.lineup.repository;

import com.newbie.baseball.domain.lineup.entity.LineUp;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface LineUpRepository extends JpaRepository<LineUp, Integer> {

    List<LineUp> findByGameId(Integer gameId);
}