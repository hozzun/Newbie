package com.newbie.board.mypage.dto;


import lombok.Data;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Data
@Getter
@NoArgsConstructor
public class UserResponseDto {

    private String email;
    private String nickname;
    private String address;
    private String profileImage;
    private Integer favoriteTeamId;
}
