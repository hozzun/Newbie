package com.newbie.board.usedBoard.entity;

import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "used_board_like")
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class UsedBoardLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @ManyToOne
    @JoinColumn(name = "used_board_id", nullable = false)
    private UsedBoard usedBoard;

    private Long userId;

    @Builder.Default
    @Column(name = "created_at")
    private LocalDateTime createdAt = LocalDateTime.now();
}
