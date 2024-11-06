package com.newbie.baseball.domain.rank.entity;

import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "`rank`")
public class Rank {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "year", length = 10)
    private String year;

    @Column(name = "`rank`")
    private Integer rank;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "game_count")
    private Integer gameCount;

    @Column(name = "win_count")
    private Integer winCount;

    @Column(name = "lose_count")
    private Integer loseCount;

    @Column(name = "draw_count")
    private Integer drawCount;

    @Column(name = "win_rate", length = 10)
    private String winRate;

    @Column(name = "game_diff", length = 10)
    private String gameDiff;

    @Column(name = "recent_10", length = 20)
    private String recent10;

    @Column(name = "streak", length = 10)
    private String streak;

    @Column(name = "rank_change")
    private Integer rankChange;
}