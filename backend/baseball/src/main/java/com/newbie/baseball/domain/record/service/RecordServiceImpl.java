package com.newbie.baseball.domain.record.service;

import com.newbie.baseball.domain.record.dto.res.GameResultDetailDto;
import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import com.newbie.baseball.domain.record.dto.res.TeamScoreDetailDto;
import com.newbie.baseball.domain.record.entity.Record;
import com.newbie.baseball.domain.record.exception.RecordNotFoundException;
import com.newbie.baseball.domain.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;

@Service
@RequiredArgsConstructor
public class RecordServiceImpl implements RecordService {

    private final RecordRepository recordRepository;

    @Override
    public RecordResponseDto getRecordByGameId(Integer gameId) {
        Record record = recordRepository.findByGameId(gameId)
                .orElseThrow(RecordNotFoundException::new);
        return convertToDto(record);
    }

    private RecordResponseDto convertToDto(Record record) {
        List<String> winningHitList = record.getWinningHit() != null
                ? Collections.singletonList(record.getWinningHit().replace("\"", ""))
                : Collections.emptyList();

        TeamScoreDetailDto awayTeamScore = TeamScoreDetailDto.builder()
                .teamId(record.getGame().getAwayTeam().getId())
                .scores(record.getAwayScore())
                .run(record.getAwayRun())
                .hit(record.getAwayHit())
                .error(record.getAwayError())
                .baseOnBalls(record.getAwayBaseOnBalls())
                .build();

        TeamScoreDetailDto homeTeamScore = TeamScoreDetailDto.builder()
                .teamId(record.getGame().getHomeTeam().getId())
                .scores(record.getHomeScore())
                .run(record.getHomeRun())
                .hit(record.getHomeHit())
                .error(record.getHomeError())
                .baseOnBalls(record.getHomeBaseOnBalls())
                .build();

        GameResultDetailDto gameResultDetails = GameResultDetailDto.builder()
                .winningHit(winningHitList)
                .homeRuns(record.getHomeRuns())
                .doubles(record.getDoubles())
                .triples(record.getTriples())
                .errors(record.getErrors())
                .stolenBases(record.getStolenBases())
                .caughtStealing(record.getCaughtStealing())
                .doublePlays(record.getDoublePlays())
                .wildPitches(record.getWildPitches())
                .umpires(record.getUmpires())
                .build();

        return RecordResponseDto.builder()
                .gameId(record.getGame().getId())
                .inningCount(record.getInningCount())
                .teamScoreDetails(List.of(awayTeamScore, homeTeamScore))
                .gameResultDetails(gameResultDetails)
                .build();
    }
}
