package com.newbie.cardstore.usercard.dto;

import lombok.Data;

@Data
public class PurchaseDto {

    private Long userId;
    private String cardId;
    private double price;
    private String createdAt;
}
