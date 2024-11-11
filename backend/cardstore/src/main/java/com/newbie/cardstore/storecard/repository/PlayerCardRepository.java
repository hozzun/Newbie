package com.newbie.cardstore.storecard.repository;

import com.newbie.cardstore.storecard.entity.PlayerCard;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;

import java.util.List;
import java.util.Set;

public interface PlayerCardRepository extends MongoRepository<PlayerCard, String> {
    List<PlayerCard> findByTeam(int teamId);

    List<PlayerCard> findByTeamOrderByCreatedAtDesc(int teamId);      // 최신순
    List<PlayerCard> findByTeamOrderBySalesCountDesc(int teamId);
    List<PlayerCard> findTop3ByOrderBySalesCountDesc();
    PlayerCard findTop1ByIdInOrderByCreatedAtDesc(Set<ObjectId> cardIds);

}


