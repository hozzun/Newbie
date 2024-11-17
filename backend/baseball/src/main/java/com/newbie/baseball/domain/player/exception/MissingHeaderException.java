package com.newbie.baseball.domain.player.exception;

public class MissingHeaderException extends RuntimeException {

    private static final String ERROR_MESSAGE = "X-User-ID 헤더가 누락되었습니다.";

    public MissingHeaderException() {
        super(ERROR_MESSAGE);
    }
}
