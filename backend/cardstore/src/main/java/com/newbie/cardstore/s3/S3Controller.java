package com.newbie.cardstore.s3;

import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RequestPart;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RequiredArgsConstructor
@Controller
public class S3Controller {

    private final S3Service s3Service;

    @PostMapping("/upload")
    public ResponseEntity<String> uploadCard(
            @RequestPart(value = "image") MultipartFile image,
            @RequestParam String name,
            @RequestParam String no,
            @RequestParam String team,
            @RequestParam String position,
            @RequestParam double price) {

        try {
            String imageUrl = s3Service.saveFile(image, name, no, team, position, price);
            return ResponseEntity.ok("Card uploaded successfully. Image URL: " + imageUrl);
        } catch (IOException e) {
            return ResponseEntity.status(500).body("Failed to upload card");
        }
    }
}
