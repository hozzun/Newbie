package com.newbie.auth.member.repository;

import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.domain.MemberImage;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface MemberImageRepository extends JpaRepository<MemberImage, Member> {
    Optional<MemberImage> findByMember(Member member);
}
