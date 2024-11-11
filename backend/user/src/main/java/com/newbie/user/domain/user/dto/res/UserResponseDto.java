package com.newbie.user.domain.user.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class UserResponseDto {

    private String email;
    private String nickname;
    private String address;
    private String profileImage;
    private Integer favoriteTeamId;
}
