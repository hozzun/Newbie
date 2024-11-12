package com.newbie.board.usedBoard.entity;

import com.newbie.board.usedBoard.entity.Tag;
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

    @ManyToOne
    @JoinColumn(name = "user_id", nullable = false)
    private User user;

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
    private List<Tag> tags = new ArrayList<>(); // 기본값으로 빈 리스트 할당

    public void addTag(Tag tag) {
        if (!tags.contains(tag)) {
            tags.add(tag);
            tag.getUsedBoards().add(this);
        }
    }
}
