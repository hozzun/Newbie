package com.newbie.cardstore.usercard.repository;

import com.newbie.cardstore.storecard.entity.PlayerCard;
import com.newbie.cardstore.usercard.entity.UserCard;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface UserCardRepository extends MongoRepository<UserCard, String> {
    boolean existsByUserIdAndCardIdsContains(Long userId, ObjectId cardId);
    List<ObjectId> findCardIdsByUserId(Long userId);
    Optional<UserCard> findByUserId(Long userId);
}
