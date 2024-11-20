package com.newbie.auth.global.token.entity;

import jakarta.persistence.*;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Builder
@AllArgsConstructor
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Table(name = "refresh_token")
public class RefreshToken {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id; // 자동 증가 ID 필드

    @Column(name = "refreshToken", nullable = false, unique = true) // 인덱스를 추가하여 유니크한 값으로 설정
    private String refreshToken;

    @Column(name = "email")
    private String email;

    // 추가로 만료 시간 등을 저장하려면 필드 추가 가능
    @Column(name = "expiryDate")
    private LocalDateTime expiryDate;

    // 기본값 설정: 엔티티가 persist 될 때 자동으로 만료시간을 현재 시각으로부터 7일 후로 설정
    @PrePersist
    public void prePersist() {
        this.expiryDate =
            this.expiryDate == null ? LocalDateTime.now().plusDays(7) : this.expiryDate;
    }
}