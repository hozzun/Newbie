package com.newbie.auth.oauth.exception;

public class AlreadySignUpException extends RuntimeException {
    public AlreadySignUpException(String message) {
        super(message);
    }
}
