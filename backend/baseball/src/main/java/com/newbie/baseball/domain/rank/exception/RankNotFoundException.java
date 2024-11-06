package com.newbie.baseball.domain.rank.exception;

public class RankNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "팀 순위를 찾지 못했습니다.";

    public RankNotFoundException() {
        super(ERROR_MESSAGE);
    }
}