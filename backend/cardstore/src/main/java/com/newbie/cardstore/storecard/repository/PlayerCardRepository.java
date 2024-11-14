package com.newbie.cardstore.storecard.repository;

import com.newbie.cardstore.storecard.entity.PlayerCard;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import java.util.List;
import java.util.Optional;
import java.util.Set;

public interface PlayerCardRepository extends MongoRepository<PlayerCard, String> {

    List<PlayerCard> findByTeam(int teamId);
    List<PlayerCard> findByTeamAndPosition(int team, String position);

    @Query(value = "{ 'team': ?0, 'position': ?1 }", sort = "{ 'createdAt': -1 }")
    List<PlayerCard> findByTeamAndPositionOrderByCreatedAtDesc(int teamId, String position);

    @Query(value = "{ 'team': ?0, 'position': ?1 }", sort = "{ 'salesCount': -1 }")
    List<PlayerCard> findByTeamAndPositionOrderBySalesCountDesc(int teamId, String position);

    @Query(value = "{}", sort = "{ 'salesCount': -1 }")
    List<PlayerCard> findTop3ByOrderBySalesCountDesc();

    @Query(value = "{ '_id': { '$in': ?0 } }", sort = "{ 'createdAt': -1 }")
    List<PlayerCard> findByIdInOrderByCreatedAtDesc(Set<ObjectId> cardIds);

    List<PlayerCard> findByTeamOrderByCreatedAtDesc(int teamId);
    List<PlayerCard> findByTeamOrderBySalesCountDesc(int teamId);

}



