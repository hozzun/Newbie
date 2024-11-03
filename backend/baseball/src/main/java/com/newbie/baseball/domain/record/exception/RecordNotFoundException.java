package com.newbie.baseball.domain.record.exception;

public class RecordNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "경기기록을 찾지 못했습니다.";

    public RecordNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
