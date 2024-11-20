package com.newbie.baseball.domain.playerStats.service;

import com.newbie.baseball.domain.playerStats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.playerStats.dto.res.PitcherStatsResponseDto;
import com.newbie.baseball.domain.playerStats.entity.HitterStats;
import com.newbie.baseball.domain.playerStats.entity.PitcherStats;
import com.newbie.baseball.domain.playerStats.exception.StatsNotFoundException;
import com.newbie.baseball.domain.playerStats.repository.HitterStatsRepository;
import com.newbie.baseball.domain.playerStats.repository.PitcherStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final HitterStatsRepository hitterStatsRepository;
    private final PitcherStatsRepository pitcherStatsRepository;

    @Override
    public List<HitterStatsResponseDto> getHitterStats(Integer playerId) {
        List<HitterStats> hitterStats = hitterStatsRepository.findByPlayerId(playerId);
        if (hitterStats.isEmpty()) {
            throw new StatsNotFoundException();
        }
        return hitterStats.stream()
                .map(this::convertToHitterStatsResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public HitterStatsResponseDto getHittersStatsByYear(Integer playerId, String year) {
        HitterStats hitterStats = hitterStatsRepository.findByPlayerIdAndYear(playerId, year)
                .orElseThrow(StatsNotFoundException::new);
        return convertToHitterStatsResponseDto(hitterStats);
    }

    @Override
    public List<PitcherStatsResponseDto> getPitcherStats(Integer playerId) {
        List<PitcherStats> pitcherStats = pitcherStatsRepository.findByPlayerId(playerId);
        if (pitcherStats.isEmpty()) {
            throw new StatsNotFoundException();
        }
        return pitcherStats.stream()
                .map(this::convertToPitcherStatsResponseDto)
                .collect(Collectors.toList());
    }

    @Override
    public PitcherStatsResponseDto getPitchersStatsByYear(Integer playerId, String year) {
        PitcherStats pitcherStats = pitcherStatsRepository.findByPlayerIdAndYear(playerId, year)
                .orElseThrow(StatsNotFoundException::new);
        return convertToPitcherStatsResponseDto(pitcherStats);
    }

    private HitterStatsResponseDto convertToHitterStatsResponseDto(HitterStats hitterStats) {
        return HitterStatsResponseDto.builder()
                .year(hitterStats.getYear())
                .playerId(hitterStats.getPlayer().getId())
                .playerName(hitterStats.getPlayer().getName())
                .teamId(hitterStats.getTeam().getId())
                .teamName(hitterStats.getTeam().getTeamName())
                .avg(hitterStats.getAvg())
                .gameCount(hitterStats.getGameCount())
                .pa(hitterStats.getPa())
                .ab(hitterStats.getAb())
                .r(hitterStats.getR())
                .h(hitterStats.getH())
                .two(hitterStats.getTwo())
                .three(hitterStats.getThree())
                .homerun(hitterStats.getHomerun())
                .tb(hitterStats.getTb())
                .rbi(hitterStats.getRbi())
                .sac(hitterStats.getSac())
                .sf(hitterStats.getSf())
                .build();
    }

    private PitcherStatsResponseDto convertToPitcherStatsResponseDto(PitcherStats pitcherStats) {
        return PitcherStatsResponseDto.builder()
                .year(pitcherStats.getYear())
                .playerId(pitcherStats.getPlayer().getId())
                .playerName(pitcherStats.getPlayer().getName())
                .teamId(pitcherStats.getTeam().getId())
                .era(pitcherStats.getEra())
                .teamName(pitcherStats.getTeam().getTeamName())
                .gameCount(pitcherStats.getGameCount())
                .win(pitcherStats.getWin())
                .lose(pitcherStats.getLose())
                .save(pitcherStats.getSave())
                .hld(pitcherStats.getHld())
                .wpct(pitcherStats.getWpct())
                .ip(pitcherStats.getIp())
                .h(pitcherStats.getH())
                .hr(pitcherStats.getHr())
                .bb(pitcherStats.getBb())
                .hbp(pitcherStats.getHbp())
                .so(pitcherStats.getSo())
                .r(pitcherStats.getR())
                .er(pitcherStats.getEr())
                .whip(pitcherStats.getWhip())
                .build();
    }
}
