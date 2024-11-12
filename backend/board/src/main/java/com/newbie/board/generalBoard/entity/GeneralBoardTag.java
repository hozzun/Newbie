package com.newbie.board.generalBoard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "general_tag")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class GeneralBoardTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "generalBoardTags", fetch = FetchType.EAGER)
    private List<GeneralBoard> generalBoards = new ArrayList<>();

    public GeneralBoardTag(String name) {
        this.name = name;
    }
}
