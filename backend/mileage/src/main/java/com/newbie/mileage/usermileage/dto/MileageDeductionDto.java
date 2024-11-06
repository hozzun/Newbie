package com.newbie.mileage.usermileage.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class MileageDeductionDto {
    private int userId;
    private double amount;
    private String reason;
    private String type;
}
