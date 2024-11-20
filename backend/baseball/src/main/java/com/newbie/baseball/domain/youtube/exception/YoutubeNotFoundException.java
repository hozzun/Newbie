package com.newbie.baseball.domain.youtube.exception;

public class YoutubeNotFoundException extends RuntimeException {

    private static final String ERROR_MESSAGE = "하이라이트 영상을 찾을 수 없습니다.";

    public YoutubeNotFoundException() {
        super(ERROR_MESSAGE);
    }
}
