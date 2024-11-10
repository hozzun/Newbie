package com.newbie.cardstore.storecard.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

@Data
@AllArgsConstructor
@Builder
public class PlayerDetailDto {

    private String id;
    private String name;
    private String no;
    private int team;
    private double price;
    private String imageUrl;
    private String position;
    private String createdAt;
    private String birthday;
    private String physical;
    private String career;
}
