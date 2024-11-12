package com.newbie.board.usedBoard.entity;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "used_tag")
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
public class UsedBoardTag {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true)
    private String name;

    @ManyToMany(mappedBy = "usedBoardTags", fetch = FetchType.EAGER)
    private List<UsedBoard> usedBoards = new ArrayList<>();


    public UsedBoardTag(String name) {
        this.name = name;
    }
}
