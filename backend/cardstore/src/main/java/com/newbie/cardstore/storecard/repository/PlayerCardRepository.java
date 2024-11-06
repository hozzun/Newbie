package com.newbie.cardstore.storecard.repository;

import com.newbie.cardstore.storecard.entity.PlayerCard;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;

public interface PlayerCardRepository extends MongoRepository<PlayerCard, String> {
    List<PlayerCard> findByTeam(String team);

    // 팀별 최신순으로 카드 조회
    List<PlayerCard> findByTeamOrderByCreatedAtDesc(String team);

    // 팀별 판매순으로 카드 조회
    List<PlayerCard> findByTeamOrderBySalesCountDesc(String team);
}
