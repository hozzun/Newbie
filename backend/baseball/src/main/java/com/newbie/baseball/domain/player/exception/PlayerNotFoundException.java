package com.newbie.baseball.domain.player.exception;

public class PlayerNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "선수를 찾을 수 없습니다.";

    public PlayerNotFoundException() {
        super(ERROR_MESSAGE);
    }
}