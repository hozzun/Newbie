package com.newbie.baseball.domain.team.entity;

import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.rank.entity.Rank;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
@Table(name = "team")
public class Team {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "team_name", length = 10)
    private String teamName;

    @Lob
    @Column(name = "team_logo")
    private String teamLogo;

    @OneToMany(mappedBy = "homeTeam")
    private List<Game> homeGames;

    @OneToMany(mappedBy = "awayTeam")
    private List<Game> awayGames;

    @OneToMany(mappedBy = "team")
    private List<Player> players;

    @OneToOne(mappedBy = "team")
    private Rank rank;

//    @OneToMany(mappedBy = "team")
//    private List<TeamHitterStats> teamHitterStats;
//
//    @OneToMany(mappedBy = "team")
//    private List<TeamPitcherStats> teamPitcherStats;
//
//    @OneToMany(mappedBy = "team")
//    private List<HitterStats> hitterStats;
//
//    @OneToMany(mappedBy = "team")
//    private List<PitcherStats> pitcherStats;
}
