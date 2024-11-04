package com.newbie.cardstore.usercard.repository;

import com.newbie.cardstore.usercard.entity.UserCard;
import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface UserCardRepository extends MongoRepository<UserCard, String> {
    boolean existsByUserIdAndCardId(int userId, ObjectId cardId);
}
