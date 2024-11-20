package com.newbie.baseball.domain.lineup.service;

import com.newbie.baseball.domain.lineup.dto.LineUpResponseDto;
import com.newbie.baseball.domain.lineup.dto.TeamLineUpResponseDto;
import com.newbie.baseball.domain.lineup.entity.LineUp;
import com.newbie.baseball.domain.lineup.exception.LineUpNotFoundException;
import com.newbie.baseball.domain.lineup.repository.LineUpRepository;
import com.newbie.baseball.domain.team.entity.Team;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@RequiredArgsConstructor
@Service
public class LineUpServiceImpl implements LineUpService {

    private final LineUpRepository lineUpRepository;

    @Override
    public List<TeamLineUpResponseDto> getLineUpByGameId(Integer gameId) {
        List<LineUp> lineUp = lineUpRepository.findByGameId(gameId);
        if (lineUp.isEmpty()) {
            throw new LineUpNotFoundException();
        }
        return lineUp.stream()
                .collect(Collectors.groupingBy(LineUp::getTeam))
                .entrySet()
                .stream()
                .map(entry -> TeamLineUpResponseDto.builder()
                        .gameId(gameId)
                        .teamId(entry.getKey().getId())
                        .teamName(entry.getKey().getTeamName())
                        .players(entry.getValue().stream()
                                .map(this::convertLineUpToDto)
                                .collect(Collectors.toList()))
                        .build())
                .collect(Collectors.toList());
    }

    private LineUpResponseDto convertLineUpToDto(LineUp lineUp) {
        return LineUpResponseDto.builder()
                .teamId(lineUp.getTeam().getId())
                .teamName(lineUp.getTeam().getTeamName())
                .playerId(lineUp.getPlayer().getId())
                .playerName(lineUp.getPlayer().getName())
                .battingOrder(lineUp.getBattingOrder())
                .position(lineUp.getPosition())
                .war(lineUp.getWar())
                .build();
    }
}