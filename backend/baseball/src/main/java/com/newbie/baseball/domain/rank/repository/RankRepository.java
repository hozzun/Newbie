package com.newbie.baseball.domain.rank.repository;

import com.newbie.baseball.domain.rank.entity.Rank;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;


public interface RankRepository extends JpaRepository<Rank, Integer> {

    List<Rank> findByYear(String year);
    List<Rank> findByTeamId(Integer teamId);
    Optional<Rank> findByYearAndTeamId(String year, Integer teamId);
}
