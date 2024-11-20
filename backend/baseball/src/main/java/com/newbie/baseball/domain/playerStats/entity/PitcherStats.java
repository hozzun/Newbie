package com.newbie.baseball.domain.playerStats.entity;

import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "pitcher_stats")
public class PitcherStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    @Column(name = "year", length = 10)
    private String year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    private Player player;

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
