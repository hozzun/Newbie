package com.newbie.auth.member.exception;

import static com.newbie.auth.member.domain.ExceptionMessages.DUPLICATE;

public class MemberDuplicateException extends RuntimeException {

    public MemberDuplicateException() {
        super(DUPLICATE.getMessage());
    }

    public MemberDuplicateException(String token) {
        super(token);
    }
}
