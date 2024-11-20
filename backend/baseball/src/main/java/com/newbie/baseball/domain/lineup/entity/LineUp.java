package com.newbie.baseball.domain.lineup.entity;

import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "lineup")
public class LineUp {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "game_id")
    private Game game;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "player_id")
    private Player player;

    @Column(name = "batting_order")
    private Integer battingOrder;

    @Column(name = "position", length = 10)
    private String position;

    @Column(name = "war", length = 10)
    private String war;
}
