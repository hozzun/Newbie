package com.newbie.baseball.domain.team.exception;

public class TeamNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "팀을 찾을 수 없습니다.";

    public TeamNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
