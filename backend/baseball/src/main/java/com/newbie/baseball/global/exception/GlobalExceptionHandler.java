package com.newbie.baseball.global.exception;

import com.newbie.baseball.domain.game.exception.GameNotFoundException;
import com.newbie.baseball.domain.lineup.exception.LineUpNotFoundException;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.playerStats.exception.StatsNotFoundException;
import com.newbie.baseball.domain.rank.exception.RankNotFoundException;
import com.newbie.baseball.domain.record.exception.RecordNotFoundException;
import com.newbie.baseball.domain.team.exception.TeamNotFoundException;
import com.newbie.baseball.domain.teamStats.exception.TeamStatsNotFoundException;
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

    @ExceptionHandler(GameNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleGameNotFoundException(GameNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(PlayerNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handlePlayerNotFoundException(PlayerNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(StatsNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleStatsNotFoundException(StatsNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RankNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleRankNotFoundException(RankNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(RecordNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleRecordNotFoundException(RecordNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TeamNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleTeamNotFoundException(TeamNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(TeamStatsNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleTeamStatsNotFoundException(TeamStatsNotFoundException ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(LineUpNotFoundException.class)
    public ResponseEntity<Map<String, Object>> handleLineUpNotFoundException(LineUpNotFoundException ex, HttpServletRequest request) {
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
