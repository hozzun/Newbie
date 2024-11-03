package com.newbie.baseball.domain.rank.service;

import com.newbie.baseball.domain.rank.dto.res.RankResponseDto;
import com.newbie.baseball.domain.rank.entity.Rank;
import com.newbie.baseball.domain.rank.exception.RankNotFoundException;
import com.newbie.baseball.domain.rank.repository.RankRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class RankServiceImpl implements RankService {

    private final RankRepository rankRepository;

    @Override
    public List<RankResponseDto> getAllRanks() {
        List<Rank> ranks = rankRepository.findAll();
        if (ranks.isEmpty()) {
            throw new RankNotFoundException();
        }
        return ranks.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<RankResponseDto> getRanksByYear(String year) {
        List<Rank> ranks = rankRepository.findByYear(year);
        if (ranks.isEmpty()) {
            throw new RankNotFoundException();
        }
        return ranks.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private RankResponseDto convertToDto(Rank rank) {
        return RankResponseDto.builder()
                .id(rank.getId())
                .year(rank.getYear())
                .rank(rank.getRank())
                .teamId(rank.getTeam().getId())
                .teamName(rank.getTeam().getTeamName())
                .gameCount(rank.getGameCount())
                .winCount(rank.getWinCount())
                .loseCount(rank.getLoseCount())
                .drawCount(rank.getDrawCount())
                .winRate(rank.getWinRate())
                .gameDiff(rank.getGameDiff())
                .recent10(rank.getRecent10())
                .streak(rank.getStreak())
                .rankChange(rank.getRankChange())
                .build();
    }
}
