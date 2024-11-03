package com.newbie.baseball.domain.playerStats.exception;

public class StatsNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "선수 성적이 없습니다.";

    public StatsNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
