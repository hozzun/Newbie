package com.newbie.mypage.watch_game.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Builder
@AllArgsConstructor
@NoArgsConstructor
public class TicketResponseDto {

    private String id;
    private int userId;
    private String date;
    private String team1English;
    private String team2English;
    private String team1Korean;
    private String team2Korean;
    private String imageUrl;
    private String text;
}
