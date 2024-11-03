package com.newbie.baseball.domain.teamStats.entity;

import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "team_pitcher_stats")
public class TeamPitcherStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "rank")
    private Integer rank;

    @Column(name = "year", length = 10)
    private String year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "era", length = 10)
    private String era;

    @Column(name = "game_count")
    private Integer gameCount;

    @Column(name = "win")
    private Integer win;

    @Column(name = "lose")
    private Integer lose;

    @Column(name = "save")
    private Integer save;

    @Column(name = "hld")
    private Integer hld;

    @Column(name = "wpct", length = 10)
    private String wpct;

    @Column(name = "ip", length = 10)
    private String ip;

    @Column(name = "h")
    private Integer h;

    @Column(name = "hr")
    private Integer hr;

    @Column(name = "bb")
    private Integer bb;

    @Column(name = "hbp")
    private Integer hbp;

    @Column(name = "so")
    private Integer so;

    @Column(name = "r")
    private Integer r;

    @Column(name = "er")
    private Integer er;

    @Column(name = "whip", length = 10)
    private String whip;

}
