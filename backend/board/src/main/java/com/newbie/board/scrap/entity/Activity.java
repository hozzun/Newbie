package com.newbie.board.scrap.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "activity")
@Builder
@AllArgsConstructor
@Data
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Activity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @Column(name = "board_type")
    private String boardType;

    @Column(name = "type")
    private String type;

    @Column(name = "content")
    private String content;

    @Column(name = "board_id")
    private Long boardId;

    @Column(name = "created_at")
    private LocalDateTime createdAt;
}
