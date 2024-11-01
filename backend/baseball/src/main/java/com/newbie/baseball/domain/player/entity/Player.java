package com.newbie.baseball.domain.player.entity;

import com.newbie.baseball.domain.team.entity.Team;
import jakarta.persistence.*;
import lombok.Getter;

@Getter
@Entity
@Table(name = "player")
public class Player {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @Column(name = "back_number", length = 10)
    private String backNumber;

    @Column(name = "name", length = 10)
    private String name;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "team_id")
    private Team team;

    @Column(name = "position", length = 10)
    private String position;

    @Column(name = "birth", length = 10)
    private String birth;

    @Column(name = "physical", length = 20)
    private String physical;

    @Column(name = "academic", length = 50)
    private String academic;
}