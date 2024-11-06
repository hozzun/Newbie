package com.newbie.baseball.domain.record.service;

import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import com.newbie.baseball.domain.record.entity.Record;
import com.newbie.baseball.domain.record.exception.RecordNotFoundException;
import com.newbie.baseball.domain.record.repository.RecordRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

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
        return RecordResponseDto.builder()
                .gameId(record.getGame().getId())
                .stadium(record.getStadium())
                .crowd(record.getCrowd())
                .startTime(record.getStartTime())
                .endTime(record.getEndTime())
                .runTime(record.getRunTime())
                .awayScore(record.getAwayScore())
                .homeScore(record.getHomeScore())
                .awayStartingPitcher(record.getAwayStartingPitcher())
                .homeStartingPitcher(record.getHomeStartingPitcher())
                .winningHit(record.getWinningHit())
                .homeRuns(record.getHomeRuns())
                .doubles(record.getDoubles())
                .errors(record.getErrors())
                .stolenBases(record.getStolenBases())
                .caughtStealing(record.getCaughtStealing())
                .doublePlays(record.getDoublePlays())
                .wildPitches(record.getWildPitches())
                .umpires(record.getUmpires())
                .build();
    }
}
