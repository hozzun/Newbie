package com.newbie.baseball.domain.team.entity;

import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.player.entity.Player;
import jakarta.persistence.*;

import java.util.List;

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

    @OneToMany(mappedBy = "team")
    private List<Player> players;

    @OneToMany(mappedBy = "homeTeam")
    private List<Game> homeGames;

    @OneToMany(mappedBy = "awayTeam")
    private List<Game> awayGames;

}
