package com.newbie.baseball.domain.stats.service;

import com.newbie.baseball.domain.stats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.stats.dto.res.PitcherStatsResponseDto;

public interface StatsService {

    HitterStatsResponseDto getHitterStats(Integer playerId);
    PitcherStatsResponseDto getPitcherStats(Integer playerId);
}
