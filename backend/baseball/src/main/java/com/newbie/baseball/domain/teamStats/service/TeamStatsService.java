package com.newbie.baseball.domain.teamStats.service;

import com.newbie.baseball.domain.teamStats.dto.res.TeamHitterStatsResponseDto;
import com.newbie.baseball.domain.teamStats.dto.res.TeamPitcherStatsResponseDto;

import java.util.List;

public interface TeamStatsService {

    List<TeamHitterStatsResponseDto> getAllTeamHitterStats();
    List<TeamHitterStatsResponseDto> getTeamHitterStatsByTeamId(Integer teamId);
    TeamHitterStatsResponseDto getTeamHitterStatsByIdAndYear(Integer teamId, String year);

    List<TeamPitcherStatsResponseDto> getAllTeamPitcherStats();
    List<TeamPitcherStatsResponseDto> getTeamPitcherStatsByTeamId(Integer teamId);
    TeamPitcherStatsResponseDto getTeamPitcherStatsByIdAndYear(Integer teamId, String year);
}
