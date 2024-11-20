package com.newbie.baseball.domain.player.entity;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@Table(name = "player_like")
public class PlayerLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Integer id;

    @Column(name = "member_id", nullable = false)
    private Long memberId;

    @Column(name = "player_id", nullable = false)
    private Integer playerId;

    @Column(name = "is_liked", nullable = false)
    private Boolean isLiked = false;

    public PlayerLike(Long memberId, Integer playerId) {
        this.memberId = memberId;
        this.playerId = playerId;
        this.isLiked = true;
    }

    public void toggleLike() {
        this.isLiked = !this.isLiked;
    }
}
