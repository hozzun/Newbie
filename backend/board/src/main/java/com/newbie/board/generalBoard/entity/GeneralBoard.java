package com.newbie.board.generalBoard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Table(name = "general_board")
@Data
@Builder(toBuilder = true)
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class GeneralBoard {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "user_name")
    private String userName;

    @NotNull
    private String title;

    @NotNull
    private String content;

    @Column(name = "image_url")
    private String imageUrl;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();

    @Builder.Default
    @Column(name = "is_deleted")
    private String isDeleted = "N";

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Column(name = "view_count")
    @Builder.Default
    private Integer viewCount = 0;

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

    @Builder.Default
    @OneToMany(mappedBy = "generalBoard", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<GeneralBoardComment> comments = new ArrayList<>();
}
