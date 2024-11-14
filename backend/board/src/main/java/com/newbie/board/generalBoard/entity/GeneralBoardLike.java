package com.newbie.board.generalBoard.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "general_board_like")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GeneralBoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "general_board_id", nullable = false)
    private GeneralBoard generalBoard;

    private Long userId;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
