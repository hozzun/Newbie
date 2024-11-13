package com.newbie.baseball.domain.player.exception;

public class LikeNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "좋아요 중인 선수들의 목록이 없습니다.";

    public LikeNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
