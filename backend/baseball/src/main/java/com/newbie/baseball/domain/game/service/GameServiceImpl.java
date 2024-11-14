package com.newbie.baseball.domain.game.service;

import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.ObjectMapper;
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
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.scheduling.annotation.Scheduled;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;

import java.io.IOException;
import java.util.List;
import java.util.Map;
import java.util.concurrent.ConcurrentHashMap;
import java.util.concurrent.Executors;
import java.util.concurrent.ScheduledExecutorService;
import java.util.concurrent.TimeUnit;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;
    private final RecordService recordService;
    private final Map<Integer, SseEmitter> emitters = new ConcurrentHashMap<>();
    private final RedisTemplate<String, Object> redisTemplate;
    private final ObjectMapper objectMapper;

    private static final String GAME_CACHE_KEY_PREFIX = "game:";
    private static final long CACHE_EXPIRATION_MINUTES = 240; // 3시간
    private static final long SSE_RECONNECT_TIME = 10000L; // 10초

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
        Game game = gameRepository.findById(gameId)
                .orElseThrow(GameNotFoundException::new);

        // 진행 중이 아닌 경우 연결 거부
        if (!"진행 중".equals(game.getGameResult())) {
            throw new IllegalStateException("해당 경기는 현재 진행 중이 아닙니다.");
        }

        SseEmitter emitter = new SseEmitter(Long.MAX_VALUE);
        emitters.put(gameId, emitter);

        emitter.onCompletion(() -> emitters.remove(gameId));
        emitter.onTimeout(() -> emitters.remove(gameId));

        // Redis에서 캐시된 데이터 확인
        SSEResponseDto cachedData = getCachedGameData(gameId);
        if (cachedData != null) {
            try {
                emitter.send(SseEmitter.event().name("gameRecordUpdate").data(cachedData).reconnectTime(3000L));
                log.info("Sent cached game data for game ID: {}", gameId);
            } catch (IOException e) {
                emitters.remove(gameId);
            }
        } else {
            try {
                emitter.send(SseEmitter.event().name("init").data("Connected to game stream for game ID: " + gameId));
            } catch (IOException e) {
                emitters.remove(gameId);
            }
        }

        return emitter;
    }

    @Scheduled(fixedRate = 60000) // 1분마다 SSE 갱신
    @Transactional
    public void updateAndSendRealTimeData() {
        log.info("Updating and sending real-time data to clients...");
        gameRepository.findLiveGames().forEach(this::sendRealTimeData);
    }

    private void sendRealTimeData(Game game) {
        Integer gameId = game.getId();
        GameResponseDto gameData = convertToDto(game);

        SSEResponseDto gameRecordData = SSEResponseDto.builder().game(gameData).build();
        cacheGameData(gameId, gameRecordData);

        SseEmitter emitter = emitters.get(gameId);
        if (emitter != null) {
            try {
                emitter.send(SseEmitter.event().name("gameUpdate").data(gameRecordData).reconnectTime(3000L));
            } catch (IOException e) {
                emitters.remove(gameId);
                log.warn("SSE connection closed for gameId: {}", gameId);
            }
        }
    }

//    private void sendRealTimeData(Game game) {
//        Integer gameId = game.getId();
//        GameResponseDto gameData = convertToDto(game);
//
//        RecordResponseDto recordData;
//        try {
//            recordData = recordService.getRecordByGameId(gameId);
//        } catch (RecordNotFoundException e) {
//            log.warn("Record not found for gameId: {}", gameId);
//            return;
//        }
//
////        SSEResponseDto gameRecordData = SSEResponseDto.builder().game(gameData).record(recordData).build();
//        SSEResponseDto gameRecordData = SSEResponseDto.builder().game(gameData).build();
//        cacheGameData(gameId, gameRecordData);
//
//        SseEmitter emitter = emitters.get(gameId);
//        if (emitter != null) {
//            try {
//                emitter.send(SseEmitter.event().name("gameRecordUpdate").data(gameRecordData).reconnectTime(3000L));
//            } catch (IOException e) {
//                emitters.remove(gameId);
//                log.warn("SSE connection closed for gameId: {}", gameId);
//            }
//        }
//    }

    private void cacheGameData(Integer gameId, SSEResponseDto gameRecordData) {
        String redisKey = GAME_CACHE_KEY_PREFIX + gameId;
        try {
            String data = objectMapper.writeValueAsString(gameRecordData);
            redisTemplate.opsForValue().set(redisKey, data, CACHE_EXPIRATION_MINUTES, TimeUnit.MINUTES);
            log.info("Cached game data in Redis for game ID: {}", gameId);
        } catch (JsonProcessingException e) {
            log.error("Failed to cache game data for game ID: {}", gameId, e);
        }
    }

    private SSEResponseDto getCachedGameData(Integer gameId) {
        String redisKey = GAME_CACHE_KEY_PREFIX + gameId;
        Object cachedData = redisTemplate.opsForValue().get(redisKey);
        if (cachedData != null) {
            try {
                return objectMapper.readValue(cachedData.toString(), SSEResponseDto.class);
            } catch (JsonProcessingException e) {
                log.error("Failed to parse cached data for game ID: {}", gameId, e);
            }
        }
        return null;
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