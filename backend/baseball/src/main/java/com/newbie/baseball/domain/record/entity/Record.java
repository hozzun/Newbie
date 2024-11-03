package com.newbie.baseball.domain.record.entity;

import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.global.util.JsonToListConverter;
import jakarta.persistence.*;
import lombok.Getter;

import java.util.List;

@Getter
@Entity
@Table(name = "game_record")
public class Record {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Integer id;

    @OneToOne
    @JoinColumn(name = "game_id")
    private Game game;

    @Column(name = "stadium", length = 50)
    private String stadium;

    @Column(name = "crowd", length = 20)
    private String crowd;

    @Column(name = "start_time", length = 10)
    private String startTime;

    @Column(name = "end_time", length = 10)
    private String endTime;

    @Column(name = "run_time", length = 10)
    private String runTime;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "away_score", columnDefinition = "json")
    private List<String> awayScore;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "home_score", columnDefinition = "json")
    private List<String> homeScore;

    @Column(name = "away_starting_pitcher", length = 50)
    private String awayStartingPitcher;

    @Column(name = "home_starting_pitcher", length = 50)
    private String homeStartingPitcher;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "winning_hit", columnDefinition = "json")
    private List<String> winningHit;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "home_runs", columnDefinition = "json")
    private List<String> homeRuns;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "doubles", columnDefinition = "json")
    private List<String> doubles;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "errors", columnDefinition = "json")
    private List<String> errors;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "stolen_bases", columnDefinition = "json")
    private List<String> stolenBases;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "caught_stealing", columnDefinition = "json")
    private List<String> caughtStealing;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "double_plays", columnDefinition = "json")
    private List<String> doublePlays;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "wild_pitches", columnDefinition = "json")
    private List<String> wildPitches;

    @Convert(converter = JsonToListConverter.class)
    @Column(name = "umpires", columnDefinition = "json")
    private List<String> umpires;
}
