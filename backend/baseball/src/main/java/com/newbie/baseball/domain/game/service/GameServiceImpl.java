package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.dto.res.SSEResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.game.repository.GameRepository;
import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;
import com.newbie.baseball.domain.record.exception.RecordNotFoundException;
import com.newbie.baseball.domain.record.service.RecordService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final RecordService recordService;
    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();

    @Override
    public GameResponseDto getGameById(Integer id) {
        log.info("Searching for Game with ID: {}", id);
        Game game = gameRepository.findById(id)
                .orElseThrow(GameNotFoundException::new);
        return convertToDto(game);
    }

    @Cacheable(value = "gamesCache", key = "#year + '-' + (#month != null ? #month : '') + '-' + (#day != null ? #day : '') + '-' + (#teamId != null ? #teamId : '')")
    @Override
    public List<GameResponseDto> getGamesByDateAndOptionalTeam(String year, String month, String day, Integer teamId) {
        List<Game> games;

        String dateInput = year;
        if (month != null && !month.isEmpty()) {
            dateInput += "-" + month;
            if (day != null && !day.isEmpty()) {
                dateInput += "-" + day;
            }
        }

        if (day != null && !day.isEmpty()) {
            games = teamId != null ? gameRepository.findByDateAndTeam(dateInput, teamId) : gameRepository.findByDate(dateInput);
        } else if (month != null && !month.isEmpty()) {
            games = teamId != null ? gameRepository.findByYearAndMonthAndTeam(dateInput, teamId) : gameRepository.findByYearAndMonth(dateInput);
        } else {
            games = teamId != null ? gameRepository.findByYearAndTeam(dateInput, teamId) : gameRepository.findByYear(dateInput);
        }

        if (games.isEmpty()) {
            throw new GameNotFoundException();
        }

        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public SseEmitter streamRealTimeGameData(Integer gameId) {
        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE); // 무제한 타임아웃 설정
        emitters.put(gameId, emitter);

        emitter.onCompletion(() -> emitters.remove(gameId));
        emitter.onTimeout(() -> emitters.remove(gameId));

        // 초기 연결 시 이벤트 전송
        try {
            emitter.send(SseEmitter.event()
                    .name("init")
                    .data("Connected to game stream for game ID: " + gameId));
        } catch (IOException e) {
            emitters.remove(gameId);
        }

        return emitter;
    }

    @Scheduled(fixedRate = 330000) // 5분 30초마다 갱신
    @Transactional
    public void updateAndSendRealTimeData() {
        log.info("Updating and sending real-time data to clients every 30 seconds...");
        List<Game> liveGames = gameRepository.findLiveGames();
        log.info("Live games count: {}", liveGames.size());

        for (Game game : liveGames) {
            Integer gameId = game.getId();
            GameResponseDto gameData = convertToDto(game);

            RecordResponseDto recordData;
            try {
                recordData = recordService.getRecordByGameId(gameId);
                log.info("Fetched record data for gameId: {}", gameId);
            } catch (RecordNotFoundException e) {
                log.warn("Record not found for gameId: {}", gameId);
                continue;
            }

            SSEResponseDto gameRecordData = SSEResponseDto.builder()
                    .game(gameData)
                    .record(recordData)
                    .build();

            SseEmitter emitter = emitters.get(gameId);
            if (emitter != null) {
                try {
                    log.info("Sending gameRecordUpdate for gameId: {}", gameId);
                    emitter.send(SseEmitter.event()
                            .name("gameRecordUpdate")
                            .data(gameRecordData)
                            .reconnectTime(3000L));
                } catch (IOException e) {
                    emitters.remove(gameId);
                    log.warn("SSE 연결이 끊어졌습니다. gameId: {}", gameId);
                }
            } else {
                log.warn("No emitter found for gameId: {}", gameId);
            }
        }
    }


    private GameResponseDto convertToDto(Game game) {
        return GameResponseDto.builder()
                .id(game.getId())
                .date(game.getDate())
                .time(game.getTime())
                .homeTeamName(game.getHomeTeam().getTeamName())
                .awayTeamName(game.getAwayTeam().getTeamName())
                .homeTeamId(game.getHomeTeam().getId())
                .awayTeamId(game.getAwayTeam().getId())
                .awayScore(game.getAwayScore())
                .homeScore(game.getHomeScore())
                .gameResult(game.getGameResult())
                .stadium(game.getStadium())
                .season(game.getSeason())
                .awayStartingPitcher(
                        game.getRecord() != null ? game.getRecord().getAwayStartingPitcher() : "미정"
                )
                .homeStartingPitcher(
                        game.getRecord() != null ? game.getRecord().getHomeStartingPitcher() : "미정"
                )
                .build();
    }
}