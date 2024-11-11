package com.newbie.user.domain.user.dto.req;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserRequestDto {

    private Long userId;
    private String email;
    private String nickname;
    private String address;
}
