package com.newbie.mypage.ocr.controller;

import com.newbie.mypage.ocr.service.OcrService;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.Map;

@RestController
@RequiredArgsConstructor
public class OcrController {

    private final OcrService ocrService;

    @PostMapping(value = "/naverOcr", consumes = "multipart/form-data")
    public ResponseEntity<Map<String, Object>> ocr(@RequestParam("image") MultipartFile image)
            throws IOException, java.text.ParseException, ParseException {
        Map<String, Object> result = ocrService.callApiAndProcessTicket(image);
        return ResponseEntity.ok(result);
    }
}
