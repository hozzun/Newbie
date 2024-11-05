package com.newbie.auth.member.exception;

import static com.newbie.auth.member.domain.ExceptionMessages.RESIGNED;

public class ResignedMemberException extends RuntimeException {

    public ResignedMemberException() {
        super(RESIGNED.getMessage());
    }
}
