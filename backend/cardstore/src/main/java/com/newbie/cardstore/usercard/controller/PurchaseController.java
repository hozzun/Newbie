package com.newbie.cardstore.usercard.controller;

import com.newbie.cardstore.config.CustomException;
import com.newbie.cardstore.usercard.dto.PurchaseDto;
import com.newbie.cardstore.usercard.entity.UserCard;
import com.newbie.cardstore.usercard.service.PurchaseService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/purchase")
@RequiredArgsConstructor
public class PurchaseController {

    private final PurchaseService purchaseService;


    /**
     * 사용자가 카드를 구입
     * @param userId, cardId, price
     * @return 구입 완료 시 ok, 마일리지가 부족 시 mileage 부족, 그 외 500
     */
    @PostMapping
    public ResponseEntity<?> purchaseCard(@RequestParam String cardId, @RequestHeader("X-Member-ID") String userId) {
        try {
            purchaseService.purchaseCard(cardId, userId);
            return ResponseEntity.ok(HttpStatus.OK);
        } catch (CustomException e) {
            return ResponseEntity
                    .status(HttpStatus.BAD_REQUEST)
                    .body("Message: " + e.getErrorCode().getMessage());
        } catch (Exception e) {
            return ResponseEntity
                    .status(HttpStatus.INTERNAL_SERVER_ERROR)
                    .body("An unexpected error occurred.");
        }
    }
}
