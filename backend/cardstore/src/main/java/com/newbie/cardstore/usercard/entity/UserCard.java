package com.newbie.cardstore.usercard.entity;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

import java.util.HashSet;
import java.util.Set;

@Data
@Builder
@Document(collection = "user_cards")
public class UserCard {

    @Id
    private ObjectId id;
    private Long userId;
    private Set<ObjectId> cardIds = new HashSet<>();
    private String createdAt;
}
