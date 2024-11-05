package com.newbie.mypage.ocr.controller;


import com.newbie.mypage.ocr.dto.OcrRequestDto;
import com.newbie.mypage.ocr.service.OcrService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;

@RestController
@RequiredArgsConstructor
public class OcrController {

    private final OcrService ocrService;

    @PostMapping(value = "/ocr-check", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ArrayList<?> checkImage(@RequestParam("image") MultipartFile image) {
        return ocrService.checkImage(image);
    }
}
