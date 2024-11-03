package com.newbie.baseball.domain.teamStats.exception;

public class TeamStatsNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "팀 성적이 없습니다.";

    public TeamStatsNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
