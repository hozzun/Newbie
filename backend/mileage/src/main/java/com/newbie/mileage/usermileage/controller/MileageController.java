package com.newbie.mileage.usermileage.controller;


import com.newbie.mileage.usermileage.service.MileageService;
import lombok.Getter;
import lombok.RequiredArgsConstructor;
import org.springdoc.webmvc.core.service.RequestService;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

@RestController
@RequiredArgsConstructor
public class MileageController {

    private final MileageService mileageService;

    @GetMapping("/check-mileage")
    public ResponseEntity<Boolean> checkMileage(@RequestParam int userId, @RequestParam double price) {
        boolean hasSufficientMileage = mileageService.checkMileage(userId, price);

        if (hasSufficientMileage) {
            return ResponseEntity.ok(true);
        } else {
            return ResponseEntity.status(HttpStatus.INSUFFICIENT_STORAGE).build();
        }
    }

    @GetMapping("/mileage")
    public ResponseEntity<Double> getMileage(@RequestParam String userId) {
        Double mileage = mileageService.getMileageByUserId(userId);

        return ResponseEntity.ok(mileage);
    }
}
