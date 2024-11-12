package com.newbie.board.usedBoard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Table(name = "used_board")
@Builder(toBuilder = true)
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class UsedBoard {

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
    private Integer price;
    private String region;
    private LocalDateTime createdAt;
    @Column(name = "is_deleted")
    private String isDeleted = "N";

    @Column(name = "updated_at")
    private LocalDateTime updatedAt;

    @Builder.Default
    @ManyToMany(cascade = {CascadeType.PERSIST, CascadeType.MERGE})
    @JoinTable(
            name = "used_board_tags",
            joinColumns = @JoinColumn(name = "used_board_id"),
            inverseJoinColumns = @JoinColumn(name = "tag_id")
    )
    private List<UsedBoardTag> usedBoardTags = new ArrayList<>();

    public void addTag(UsedBoardTag usedBoardTag) {
        if (!usedBoardTags.contains(usedBoardTag)) {
            usedBoardTags.add(usedBoardTag);
            usedBoardTag.getUsedBoards().add(this);
        }
    }

    @OneToMany(mappedBy = "usedBoard", cascade = CascadeType.ALL, orphanRemoval = true, fetch = FetchType.LAZY)
    private List<UsedBoardComment> comments = new ArrayList<>();
}
