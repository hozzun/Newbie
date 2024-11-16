package com.newbie.mypage.watch_game.entity;


import com.mongodb.lang.Nullable;
import lombok.Builder;
import lombok.Data;

import com.fasterxml.jackson.annotation.JsonProperty;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "watch_game")
public class Ticket {

    @Id
    private String id;
    private int userId;
    private String date;
    private String time;
    private String team1English;
    private String team2English;
    private String team1Korean;
    private String team2Korean;
    private String imageUrl;
    private String createdAt;
    private String text;
}
