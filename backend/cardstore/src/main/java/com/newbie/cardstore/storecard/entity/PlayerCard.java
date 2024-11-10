package com.newbie.cardstore.storecard.entity;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Data
@Document(collection = "player_cards")
@Builder
public class PlayerCard {

    @Id
    private String id;
    private String name;
    private String no;
    private int team;
    private double price;
    private String imageUrl;
    private String position;
    private String createdAt;  // 생성일 필드 추가
    private String cardType;
    private int salesCount;

}
