package com.newbie.baseball.domain.game.entity;

import jakarta.persistence.*;
import lombok.*;

@Entity
@Builder
@Getter
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private String date;
    private String time;
    private Integer away_score;
    private Integer home_score;
    private String game_result;
    private String stadium;
    private String season;

}
