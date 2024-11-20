package com.newbie.baseball.domain.song.exception;

public class SongNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "응원송을 찾을 수 없습니다.";

    public SongNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
