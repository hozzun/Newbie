package com.newbie.auth.member.repository;

import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.domain.MemberPlayerLike;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;
import java.util.Optional;

public interface MemberPlayerLikeRepository extends JpaRepository<MemberPlayerLike, Integer> {

    Optional<MemberPlayerLike> findByMemberAndPlayerId(Member member, Integer playerId);
}
