package com.newbie.auth.member.domain;

import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.time.ZoneId;
import java.time.ZonedDateTime;

@Entity
@Table(name = "member")
@DynamicInsert
@DynamicUpdate
@NoArgsConstructor(access = AccessLevel.PROTECTED)
@Getter
public class Member {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Column(name = "member_id")
    private Long memberId;

    @NotNull
    @Column(name = "email", length = 60, unique = true)
    private String email;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "platform")
    private Platform platform;

    @Column(name = "create_time", columnDefinition = "DATETIME")
    private LocalDateTime createTime;

    @Builder(builderMethodName = "signupBuilder")
    public Member(MemberSignUpRequestDto memberSignUpRequestDto) {
        this.email = memberSignUpRequestDto.getEmail();
        this.platform = memberSignUpRequestDto.getPlatform();
    }

    @PrePersist
    protected void onCreate() {
        this.createTime = ZonedDateTime.now(ZoneId.of("Asia/Seoul")).toLocalDateTime();
    }
}
