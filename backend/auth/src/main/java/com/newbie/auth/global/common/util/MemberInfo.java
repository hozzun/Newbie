package com.newbie.auth.global.common.util;

import com.newbie.auth.global.security.CustomUserDetails;
import org.springframework.security.core.context.SecurityContextHolder;

public class MemberInfo {

    private MemberInfo() {
    }

    public static String getEmail() {
        return SecurityContextHolder.getContext()
            .getAuthentication()
            .getName();
    }

    public static Long getUserId() {
        Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        return ((CustomUserDetails) principal).getUserId();
    }
}
