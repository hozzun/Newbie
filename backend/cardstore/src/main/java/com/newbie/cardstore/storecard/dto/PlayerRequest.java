package com.newbie.cardstore.storecard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

@Data
@AllArgsConstructor
public class PlayerRequest {
    private int team;
    private String no;
}