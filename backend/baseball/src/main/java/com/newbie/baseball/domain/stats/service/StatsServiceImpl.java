package com.newbie.baseball.domain.stats.service;

import com.newbie.baseball.domain.stats.dto.res.HitterStatsResponseDto;
import com.newbie.baseball.domain.stats.dto.res.PitcherStatsResponseDto;
import com.newbie.baseball.domain.stats.entity.HitterStats;
import com.newbie.baseball.domain.stats.entity.PitcherStats;
import com.newbie.baseball.domain.stats.exception.StatsNotFoundException;
import com.newbie.baseball.domain.stats.repository.HitterStatsRepository;
import com.newbie.baseball.domain.stats.repository.PitcherStatsRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class StatsServiceImpl implements StatsService {

    private final HitterStatsRepository hitterStatsRepository;
    private final PitcherStatsRepository pitcherStatsRepository;

    @Override
    public HitterStatsResponseDto getHitterStats(Integer playerId) {
        HitterStats hitterStats = hitterStatsRepository.findByPlayerId(playerId)
                .orElseThrow(StatsNotFoundException::new);
        return convertToHitterStatsResponseDto(hitterStats);
    }

    @Override
    public PitcherStatsResponseDto getPitcherStats(Integer playerId) {
        PitcherStats pitcherStats = pitcherStatsRepository.findByPlayerId(playerId)
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
