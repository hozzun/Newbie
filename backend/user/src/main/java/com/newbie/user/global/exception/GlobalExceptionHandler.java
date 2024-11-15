package com.newbie.user.global.exception;

import com.newbie.user.domain.user.exception.UserNotFoundException;
import jakarta.servlet.http.HttpServletRequest;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.ControllerAdvice;
import org.springframework.web.bind.annotation.ExceptionHandler;
import org.springframework.web.multipart.MaxUploadSizeExceededException;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.Map;

@ControllerAdvice
public class GlobalExceptionHandler {

    @ExceptionHandler({
            UserNotFoundException.class,
    })
    public ResponseEntity<Map<String, Object>> handleNotFoundExceptions(RuntimeException  ex, HttpServletRequest request) {
        return buildErrorResponse(ex.getMessage(), "Not Found", request.getRequestURI(), HttpStatus.NOT_FOUND);
    }

    @ExceptionHandler(MaxUploadSizeExceededException.class)
    public ResponseEntity<Map<String, Object>> handleMaxUploadSizeException(MaxUploadSizeExceededException ex, HttpServletRequest request) {
        return buildErrorResponse(
                "업로드 파일 크기가 최대 허용 크기를 초과했습니다.",
                "Payload Too Large",
                request.getRequestURI(),
                HttpStatus.PAYLOAD_TOO_LARGE
        );
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
