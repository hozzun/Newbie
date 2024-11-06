package com.newbie.baseball.domain.rank.service;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;

import java.util.List;

public interface RankService {

    List<RankResponseDto> getAllRanks();
    List<RankResponseDto> getRanksByYear(String year);
    List<RankResponseDto> getRanksByTeamId(Integer teamId);
    RankResponseDto getRankByYearAndTeamId(String year, Integer teamId);
}
