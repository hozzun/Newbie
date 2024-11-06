package com.newbie.baseball.domain.playerStats.service;

import com.newbie.baseball.domain.playerStats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.playerStats.dto.res.PitcherStatsResponseDto;

public interface StatsService {

    HitterStatsResponseDto getHitterStats(Integer playerId);
    PitcherStatsResponseDto getPitcherStats(Integer playerId);
}
