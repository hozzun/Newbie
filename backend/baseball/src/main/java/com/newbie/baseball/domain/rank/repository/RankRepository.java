package com.newbie.baseball.domain.rank.repository;

import com.newbie.baseball.domain.rank.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;


public interface RankRepository extends JpaRepository<Rank, Integer> {
    List<Rank> findByYear(String year);
}
