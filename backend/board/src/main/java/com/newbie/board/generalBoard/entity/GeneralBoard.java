package com.newbie.board.generalBoard.entity;

import com.newbie.board.usedBoard.entity.User;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "general_board")
@Getter
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GeneralBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private Long userId;

    private String userName;

    @NotNull
    private String title;

    @NotNull
    private String content;

    private String imageUrl;
    private LocalDateTime createdAt = LocalDateTime.now();
    private String isDeleted = "N";

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder.Default
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE}, fetch = FetchType.EAGER)
    @JoinTable(
            name = "general_board_tags",
            joinColumns = @JoinColumn(name = "general_board_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<GeneralBoardTag> generalBoardTags = new ArrayList<>();


    public void addTag(GeneralBoardTag generalBoardTag) {
        if (!generalBoardTags.contains(generalBoardTag)) {
            generalBoardTags.add(generalBoardTag);
            generalBoardTag.getGeneralBoards().add(this);
        }
    }

    @OneToMany(mappedBy = "generalBoard", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<GeneralBoardComment> comments = new ArrayList<>();
}
