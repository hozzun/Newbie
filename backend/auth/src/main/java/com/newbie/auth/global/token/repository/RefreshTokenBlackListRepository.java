package com.newbie.auth.global.token.repository;

import com.newbie.auth.global.token.entity.RefreshTokenBlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface RefreshTokenBlackListRepository extends JpaRepository<RefreshTokenBlackList, Long> {
    boolean existsByRefreshToken(String refreshToken);
}
