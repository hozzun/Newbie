package com.newbie.auth.member.exception;

import static com.newbie.auth.member.domain.ExceptionMessages.NOT_FOUND;

public class NotFoundMemberException extends RuntimeException {

    public NotFoundMemberException() {
        super(NOT_FOUND.getMessage());
    }
}
