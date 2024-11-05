package com.newbie.mypage.ocr.service;

import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.util.*;

@Service
@RequiredArgsConstructor
public class OcrService {

    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${ocr.api.url}")
    private String ocrApiUrl;

    @Value("${ocr.api.key}")
    private String ocrApiKey;

    public List<String> checkImage(MultipartFile image) {

        try {
            // 1. 헤더 설정
            HttpHeaders headers = new HttpHeaders();
            headers.setContentType(MediaType.APPLICATION_JSON);
            headers.set("X-OCR-SECRET", ocrApiKey);

            // 2. 요청 본문 설정 (이미지 파일 포함)
            Map<String, Object> requestBody = new HashMap<>();
            requestBody.put("version", "V2");
            requestBody.put("requestId", "sample-id"); // 요청 ID, 고유값으로 설정 가능
            requestBody.put("timestamp", System.currentTimeMillis());
            requestBody.put("images", Collections.singletonList(
                    Map.of(
                            "format", "jpg",
                            "name", "sample_image",
                            "data", encodeImageToBase64(image)
                    )
            ));

            HttpEntity<Map<String, Object>> requestEntity = new HttpEntity<>(requestBody, headers);

            // 3. OCR API 호출
            ResponseEntity<Map> response = restTemplate.exchange(ocrApiUrl, HttpMethod.POST, requestEntity, Map.class);

            // 4. 응답 결과 처리
            if (response.getStatusCode() == HttpStatus.OK && response.getBody() != null) {
                return parseOcrResult(response.getBody());
            } else {
                throw new RuntimeException("OCR 요청 실패: " + response.getStatusCode());
            }
        } catch (Exception e) {
            throw new RuntimeException("OCR API 호출 중 오류 발생", e);
        }
    }

    // Base64 인코딩을 위한 메서드
    private String encodeImageToBase64(MultipartFile image) throws Exception {
        return java.util.Base64.getEncoder().encodeToString(image.getBytes());
    }

    // OCR 응답 결과에서 텍스트 추출
    private ArrayList<String> parseOcrResult(Map<String, Object> responseBody) {
        // OCR 결과에서 텍스트를 추출하여 ArrayList<String>으로 반환 (구체적인 파싱은 API 응답 구조에 따라 다름)
        // responseBody를 파싱하여 필요한 텍스트 데이터를 추출합니다.
        return new ArrayList<>();
    }
}
