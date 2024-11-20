package com.newbie.board.generalBoard.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class MileageUpdateMessage {
    private int userId;
    private double amount;
    private String reason;
}
