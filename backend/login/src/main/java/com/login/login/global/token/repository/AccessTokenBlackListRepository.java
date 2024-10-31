package com.login.login.global.token.repository;

import com.login.login.global.token.entity.AccessTokenBlackList;
import org.springframework.data.jpa.repository.JpaRepository;

public interface AccessTokenBlackListRepository extends JpaRepository<AccessTokenBlackList, Long> {
    boolean existsByAccessToken(String accessToken);
}
