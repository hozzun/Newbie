package com.newbie.baseball.domain.teamStats.service;

import com.newbie.baseball.domain.teamStats.dto.res.TeamHitterStatsResponseDto;
import com.newbie.baseball.domain.teamStats.dto.res.TeamPitcherStatsResponseDto;
import com.newbie.baseball.domain.teamStats.entity.TeamHitterStats;
import com.newbie.baseball.domain.teamStats.entity.TeamPitcherStats;
import com.newbie.baseball.domain.teamStats.exception.TeamStatsNotFoundException;
import com.newbie.baseball.domain.teamStats.repository.TeamHitterStatsRepository;
import com.newbie.baseball.domain.teamStats.repository.TeamPitcherStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TeamStatsServiceImpl implements TeamStatsService {

    private final TeamHitterStatsRepository teamHitterStatsRepository;
    private final TeamPitcherStatsRepository teamPitcherStatsRepository;

    @Override
    public List<TeamHitterStatsResponseDto> getAllTeamHitterStats() {
        List<TeamHitterStats> teamHitterStats = teamHitterStatsRepository.findAll();
        if (teamHitterStats.isEmpty()) {
            throw new TeamStatsNotFoundException();
        }
        return teamHitterStats.stream()
                .map(this::convertToTeamHitterStatsResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeamHitterStatsResponseDto getTeamHitterStatsByTeamId(Integer teamId) {
        TeamHitterStats teamHitterStats = teamHitterStatsRepository.findByTeamId(teamId)
                .orElseThrow(TeamStatsNotFoundException::new);
        return convertToTeamHitterStatsResponseDto(teamHitterStats);
    }

    @Override
    public List<TeamPitcherStatsResponseDto> getAllTeamPitcherStats() {
        List<TeamPitcherStats> teamPitcherStats = teamPitcherStatsRepository.findAll();
        if (teamPitcherStats.isEmpty()) {
            throw new TeamStatsNotFoundException();
        }
        return teamPitcherStats.stream()
                .map(this::convertToTeamPitcherStatsResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public TeamPitcherStatsResponseDto getTeamPitcherStatsByTeamId(Integer teamId) {
        TeamPitcherStats teamPitcherStats = teamPitcherStatsRepository.findByTeamId(teamId)
                .orElseThrow(TeamStatsNotFoundException::new);
        return convertToTeamPitcherStatsResponseDto(teamPitcherStats);
    }


    private TeamHitterStatsResponseDto convertToTeamHitterStatsResponseDto(TeamHitterStats teamHitterStats) {
        return TeamHitterStatsResponseDto.builder()
                .rank(teamHitterStats.getRank())
                .year(teamHitterStats.getYear())
                .teamId(teamHitterStats.getTeam().getId())
                .teamName(teamHitterStats.getTeam().getTeamName())
                .avg(teamHitterStats.getAvg())
                .gameCount(teamHitterStats.getGameCount())
                .pa(teamHitterStats.getPa())
                .ab(teamHitterStats.getAb())
                .r(teamHitterStats.getR())
                .h(teamHitterStats.getH())
                .two(teamHitterStats.getTwo())
                .three(teamHitterStats.getThree())
                .homerun(teamHitterStats.getHomerun())
                .tb(teamHitterStats.getTb())
                .rbi(teamHitterStats.getRbi())
                .sac(teamHitterStats.getSac())
                .sf(teamHitterStats.getSf())
                .build();
    }

    private TeamPitcherStatsResponseDto convertToTeamPitcherStatsResponseDto(TeamPitcherStats teamPitcherStats) {
        return TeamPitcherStatsResponseDto.builder()
                .rank(teamPitcherStats.getRank())
                .year(teamPitcherStats.getYear())
                .teamId(teamPitcherStats.getTeam().getId())
                .teamName(teamPitcherStats.getTeam().getTeamName())
                .era(teamPitcherStats.getEra())
                .gameCount(teamPitcherStats.getGameCount())
                .win(teamPitcherStats.getWin())
                .lose(teamPitcherStats.getLose())
                .save(teamPitcherStats.getSave())
                .hld(teamPitcherStats.getHld())
                .wpct(teamPitcherStats.getWpct())
                .ip(teamPitcherStats.getIp())
                .h(teamPitcherStats.getH())
                .hr(teamPitcherStats.getHr())
                .bb(teamPitcherStats.getBb())
                .so(teamPitcherStats.getSo())
                .r(teamPitcherStats.getR())
                .er(teamPitcherStats.getEr())
                .whip(teamPitcherStats.getWhip())
                .build();
    }

}
