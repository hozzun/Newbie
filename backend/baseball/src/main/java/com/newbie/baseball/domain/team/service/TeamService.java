package com.newbie.baseball.domain.team.service;

import com.newbie.baseball.domain.team.dto.res.TeamResponseDto;

import java.util.List;

public interface TeamService {

    List<TeamResponseDto> getAllTeams();
    TeamResponseDto getTeamById(Integer id);
}
