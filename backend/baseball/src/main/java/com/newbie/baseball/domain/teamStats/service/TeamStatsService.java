package com.newbie.baseball.domain.teamStats.service;

import com.newbie.baseball.domain.teamStats.dto.res.TeamHitterStatsResponseDto;
import com.newbie.baseball.domain.teamStats.dto.res.TeamPitcherStatsResponseDto;

import java.util.List;

public interface TeamStatsService {

    List<TeamHitterStatsResponseDto> getAllTeamHitterStats();
    TeamHitterStatsResponseDto getTeamHitterStatsByTeamId(Integer teamId);

    List<TeamPitcherStatsResponseDto> getAllTeamPitcherStats();
    TeamPitcherStatsResponseDto getTeamPitcherStatsByTeamId(Integer teamId);
}
