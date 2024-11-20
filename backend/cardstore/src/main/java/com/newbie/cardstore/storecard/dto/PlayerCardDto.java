package com.newbie.cardstore.storecard.dto;

import lombok.Builder;
import lombok.Data;
import lombok.Getter;

@Getter
@Data
@Builder
public class PlayerCardDto {
    private String id;
    private String name;
    private String no;
    private int team;
    private double price;
    private String imageUrl;
    private String position;
    private String createdAt;
}