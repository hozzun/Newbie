package com.newbie.auth.member.domain;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@Entity
@NoArgsConstructor
@AllArgsConstructor
@Table(name = "member_player_like")
public class MemberPlayerLike {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "like_id")
    private Integer id;

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "member_id", nullable = false)
    private Member member;

    @Column(name = "player_id", nullable = false)
    private Integer playerId;

    public MemberPlayerLike(Member member, Integer playerId) {
        this.member = member;
        this.playerId = playerId;
    }
}
