package com.newbie.cardstore.usercard.entity;


import lombok.*;
import org.bson.types.ObjectId;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Builder
@Document(collection = "user_cards")
public class UserCard {

    @Id
    private ObjectId id;
    private int userId;
    private ObjectId cardId;
    private String createdAt;
}
