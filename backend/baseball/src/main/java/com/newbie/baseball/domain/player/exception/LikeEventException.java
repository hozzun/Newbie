package com.newbie.baseball.domain.player.exception;

public class LikeEventException extends RuntimeException {

    private static final String ERROR_MESSAGE = "선수 좋아요 이벤트 처리 실패";

    public LikeEventException() {
        super(ERROR_MESSAGE);
    }
}
