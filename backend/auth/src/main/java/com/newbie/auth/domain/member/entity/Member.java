package com.newbie.auth.domain.member.entity;

import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.*;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;

@Entity
@Getter
@DynamicInsert
@DynamicUpdate
@Builder
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@AllArgsConstructor(access = AccessLevel.PRIVATE)
@Table(name = "member")
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "id")
    private Long id;

    @NotNull
    @Column(name = "email", nullable = false)
    private String email;

    @Column(name = "profile_image_url")
    private String profileImageUrl;

    @Column(name = "nickname")
    private String nickname;

    @Column(name = "address")
    private String address;

    @Column(name = "role", length = 20, columnDefinition = "varchar(20) default 'not_registered'")
    private String role;

//    @Column(name = "reg_date", columnDefinition = "TIMESTAMP DEFAULT CURRENT_TIMESTAMP")
    @Column(name = "reg_date", updatable = false)
    private LocalDateTime regDate;

    @Column(name = "is_resign", columnDefinition = "TINYINT(1) DEFAULT 0")
    private Boolean isResign = false; // 기본값을 필드에서 직접 설정

    @PrePersist
    protected void onCreate() {
        regDate = LocalDateTime.now(); // 생성 시점의 시간을 설정
    }

    public void register(String nickname, String address, String role) {
        this.nickname = nickname;
        this.address = address;
        this.role = role;
    }
}
