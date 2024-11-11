package com.newbie.board.domain.usedBoard.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@AllArgsConstructor
@Table(name = "used_board")
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
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
    private int price;
    private String region;
    private LocalDateTime createdAt;

    @ManyToMany(mappedBy = "usedBoards")  // 중간 테이블 자동 생성
    private List<Tag> tags = new ArrayList<>();
}
