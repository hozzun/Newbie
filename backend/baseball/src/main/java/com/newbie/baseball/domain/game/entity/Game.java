package com.newbie.baseball.domain.game.entity;

import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "game")
public class Game {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "date", length = 10)
    private String date;

    @Column(name = "time", length = 10)
    private String time;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "home_team_id")
    private Team homeTeam;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "away_team_id")
    private Team awayTeam;

    @Column(name = "away_score")
    private Integer awayScore;

    @Column(name = "home_score")
    private Integer homeScore;

    @Column(name = "game_result", length = 10)
    private String gameResult;

    @Column(name = "stadium", length = 10)
    private String stadium;

    @Column(name = "season", length = 10)
    private String season;
}