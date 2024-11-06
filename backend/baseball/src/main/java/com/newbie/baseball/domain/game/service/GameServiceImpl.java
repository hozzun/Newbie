package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

    @Override
    public GameResponseDto getGameById(Integer id) {
        Game game = gameRepository.findById(id)
                .orElseThrow(GameNotFoundException::new);
        return convertToDto(game);
    }

    @Cacheable(value = "gamesByYearAndMonth", key = "#yearMonth")
    @Override
    public List<GameResponseDto> getGameByYearAndMonth(String yearMonth) {
        List<Game> games = gameRepository.findByDateStartingWith(yearMonth);
        if (games.isEmpty()) {
            throw new GameNotFoundException();
        }
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<GameResponseDto> getGameByDate(String date) {
        List<Game> games = gameRepository.findByDate(date);
        if (games.isEmpty()) {
            throw new GameNotFoundException();
        }
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<GameResponseDto> getGameByDateAndTeamId(String date, Integer teamId) {
        List<Game> games = gameRepository.findByDateAndHomeTeamIdOrDateAndAwayTeamId(date, teamId, date, teamId);
        if (games.isEmpty()) {
            throw new GameNotFoundException();
        }
        return games.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    private GameResponseDto convertToDto(Game game) {
        return GameResponseDto.builder()
                .id(game.getId())
                .date(game.getDate())
                .time(game.getTime())
                .homeTeamName(game.getHomeTeam().getTeamName())
                .awayTeamName(game.getAwayTeam().getTeamName())
                .homTeamId(game.getHomeTeam().getId())
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