package com.newbie.user.domain.user.entity;

import jakarta.persistence.*;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Getter
@Entity
@Table(name = "`user`")
@NoArgsConstructor(access = AccessLevel.PROTECTED)
public class User {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @Column(name = "user_id", unique = true, nullable = false)
    private Long userId;

    @Column(name = "email", length = 60, unique = true, nullable = false)
    private String email;

    @Column(name = "nickname", length = 30, unique = true, nullable = false)
    private String nickname;

    @Column(name = "address")
    private String address;

    @Column(name = "profile_image")
    private String profileImage;

    @Column(name = "favorite_team_id")
    @ColumnDefault("0")
    private Integer favoriteTeamId = 0;

    @Column(name = "is_resigned")
    @ColumnDefault("false")
    private Boolean isResigned = false;

    @Builder
    public User(Long userId, String email, String nickname, String address, String profileImage, Boolean isResigned) {
        this.userId = userId;
        this.email = email;
        this.nickname = nickname;
        this.address = address;
        this.favoriteTeamId = 0;
        this.profileImage = profileImage;
        this.isResigned = false;
    }

    public void updateFavoriteTeamId(Integer favoriteTeamId) {
        this.favoriteTeamId = favoriteTeamId;
    }

    public void updateNickname(String nickname) {
        this.nickname = nickname;
    }

    public void updateAddress(String address) {
        this.address = address;
    }

    public void updateProfileImage(String profileImage) {
        this.profileImage = profileImage;
    }

    public void updateIsResigned(Boolean isResigned) {
        this.isResigned = isResigned;
        this.email = "알수없음";
        this.nickname = "알수없음";
    }
}
