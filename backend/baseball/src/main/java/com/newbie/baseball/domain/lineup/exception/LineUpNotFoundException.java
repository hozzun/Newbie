package com.newbie.baseball.domain.lineup.exception;

public class LineUpNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "라인업을 찾지 못했습니다.";

    public LineUpNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
