package com.newbie.auth.member.domain;

import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;
import com.newbie.auth.member.dto.request.MemberUpdateRequestDto;
import jakarta.persistence.*;
import jakarta.validation.constraints.NotNull;
import lombok.AccessLevel;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.ColumnDefault;
import org.hibernate.annotations.DynamicInsert;
import org.hibernate.annotations.DynamicUpdate;

import java.time.LocalDateTime;
import java.util.List;

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
    @Column(name = "nickname", length = 30, unique = true)
    private String nickname;

    @Column(name = "address")
    private String address;

    @Column(name = "favorite_team_id")
    @ColumnDefault("0")
    private Integer favoriteTeamId;

    @NotNull
    @Enumerated(EnumType.STRING)
    @Column(name = "platform")
    private Platform platform;

    @Column(name = "create_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime createTime;

    @Column(name = "resign_time", columnDefinition = "TIMESTAMP")
    private LocalDateTime resignTime;

    @Column(name = "is_resigned")
    @ColumnDefault("false")
    private Boolean isResigned;


    @OneToOne(mappedBy = "member", cascade = CascadeType.ALL, fetch = FetchType.EAGER)
    private MemberImage memberImage;

    @OneToMany(mappedBy = "member", cascade = CascadeType.ALL, orphanRemoval = true)
    private List<MemberPlayerLike> likedPlayers;

    public void updateMember(MemberUpdateRequestDto memberUpdateRequestDto) {
        this.nickname = memberUpdateRequestDto.getNickname();
    }

    public void updateFavoriteTeamId(Integer favoriteTeamId) {
        this.favoriteTeamId = favoriteTeamId;
    }

    public void resign() {
        this.isResigned = false;
    }

    @Builder(builderMethodName = "signupBuilder")
    public Member(MemberSignUpRequestDto memberSignUpRequestDto) {
        this.nickname = memberSignUpRequestDto.getNickname();
        this.email = memberSignUpRequestDto.getEmail();
        this.platform = memberSignUpRequestDto.getPlatform();
        this.address = memberSignUpRequestDto.getAddress();
    }
}
