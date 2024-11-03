package com.newbie.baseball.domain.team.service;

import com.newbie.baseball.domain.team.dto.res.TeamResponseDto;
import com.newbie.baseball.domain.team.entity.Team;
import com.newbie.baseball.domain.team.exception.TeamNotFoundException;
import com.newbie.baseball.domain.team.repository.TeamRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class TeamServiceImpl implements TeamService {

    private final TeamRepository teamRepository;

    @Override
    public List<TeamResponseDto> getAllTeams() {
        List<Team> teams = teamRepository.findAll();
        if (teams.isEmpty()) {
            throw new TeamNotFoundException();
        }
        return teams.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeamResponseDto getTeamById(Integer id) {
        Team team = teamRepository.findById(id)
                .orElseThrow(TeamNotFoundException::new);
        return convertToDto(team);
    }

    private TeamResponseDto convertToDto(Team team) {
        return TeamResponseDto.builder()
                .id(team.getId())
                .teamName(team.getTeamName())
                .teamLogo(team.getTeamLogo())
                .build();
    }
}
