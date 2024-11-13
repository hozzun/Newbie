package com.newbie.board.scrap.entity;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.usedBoard.entity.UsedBoard;
import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Entity
@Table(name = "scrap")
@Getter
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class Scrap {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "user_id")
    private Long userId;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "general_board_id", nullable = true)
    private GeneralBoard generalBoard;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "used_board_id", nullable = true)
    private UsedBoard usedBoard;

    private LocalDateTime createdAt = LocalDateTime.now();
}

