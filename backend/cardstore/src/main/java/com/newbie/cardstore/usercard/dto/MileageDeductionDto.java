package com.newbie.cardstore.usercard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MileageDeductionDto {
    private Long userId;
    private double amount;
    private String type;
    private String reason;
}
