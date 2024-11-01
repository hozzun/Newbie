package com.newbie.baseball.domain.stats.entity;

import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "hitter_stats")
public class HitterStats {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "year", length = 10)
    private String year;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    private Player player;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "avg", length = 10)
    private String avg;

    @Column(name = "game_count")
    private Integer gameCount;

    @Column(name= "pa")
    private Integer pa;

    @Column(name = "ab")
    private Integer ab;

    @Column(name = "r")
    private Integer r;

    @Column(name = "h")
    private Integer h;

    @Column(name = "two")
    private Integer two;

    @Column(name = "three")
    private Integer three;

    @Column(name = "homerun")
    private Integer homerun;

    @Column(name = "tb")
    private Integer tb;

    @Column(name = "rbi")
    private Integer rbi;

    @Column(name = "sac")
    private Integer sac;

    @Column(name = "sf")
    private Integer sf;
}
