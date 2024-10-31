package com.newbie.baseball.domain.game.exception;

public class GameNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "해당 경기를 찾을 수 없습니다. ID: ";

    public GameNotFoundException(Integer id) {
        super(ERROR_MESSAGE + id);
    }
}