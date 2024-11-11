package com.newbie.baseball.global.exception;

import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.lineup.exception.LineUpNotFoundException;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.playerStats.exception.StatsNotFoundException;
import com.newbie.baseball.domain.rank.exception.RankNotFoundException;
import com.newbie.baseball.domain.record.exception.RecordNotFoundException;
import com.newbie.baseball.domain.song.exception.SongNotFoundException;
import com.newbie.baseball.domain.team.exception.TeamNotFoundException;
import com.newbie.baseball.domain.teamStats.exception.TeamStatsNotFoundException;
import com.newbie.baseball.domain.youtube.exception.YoutubeNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            GameNotFoundException.class,
            PlayerNotFoundException.class,
            StatsNotFoundException.class,
            RankNotFoundException.class,
            RecordNotFoundException.class,
            TeamNotFoundException.class,
            TeamStatsNotFoundException.class,
            LineUpNotFoundException.class,
            SongNotFoundException.class,
            YoutubeNotFoundException.class
    })
    public ResponseEntity<Map<String, Object>> handleNotFoundExceptions(RuntimeException  ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    private ResponseEntity<Map<String, Object>> buildErrorResponse(String message, String error, String path, HttpStatus status) {
        Map<String, Object> errorResponse = new HashMap<>();
        errorResponse.put("timestamp", LocalDateTime.now());
        errorResponse.put("status", status.value());
        errorResponse.put("error", error);
        errorResponse.put("message", message);
        errorResponse.put("path", path);

        return new ResponseEntity<>(errorResponse, status);
    }
}
