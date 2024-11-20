package com.newbie.mileage.usermileage.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MileageAddDto {

    private int userId;
    private double amount;
    private String reason;
}
