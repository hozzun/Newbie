package com.newbie.baseball.domain.playerStats.service;

import com.newbie.baseball.domain.playerStats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.playerStats.dto.res.PitcherStatsResponseDto;

import java.util.List;

public interface StatsService {

    List<HitterStatsResponseDto> getHitterStats(Integer playerId);
    HitterStatsResponseDto getHittersStatsByYear(Integer playerId, String year);
    List<PitcherStatsResponseDto> getPitcherStats(Integer playerId);
    PitcherStatsResponseDto getPitchersStatsByYear(Integer playerId, String year);
}
