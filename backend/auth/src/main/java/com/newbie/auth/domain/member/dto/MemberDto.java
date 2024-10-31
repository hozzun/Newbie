package com.newbie.auth.domain.member.dto;


import lombok.Data;

import java.time.LocalDateTime;

@Data
public class MemberDto {

    private Long id;
    private String email;
    private String nickname;
    private String role;
    private LocalDateTime regDate;
    private Integer isResign;
}
