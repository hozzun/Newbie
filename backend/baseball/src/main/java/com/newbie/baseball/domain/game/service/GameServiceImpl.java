package com.newbie.baseball.domain.game.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.game.repository.GameRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Slf4j
@Service
@RequiredArgsConstructor
public class GameServiceImpl implements GameService {

    private final GameRepository gameRepository;

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