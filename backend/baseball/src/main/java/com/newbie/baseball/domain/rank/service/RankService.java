package com.newbie.baseball.domain.rank.service;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;

import java.util.List;

public interface RankService {

    List<RankResponseDto> getRanks(String year, Integer teamId);
}
