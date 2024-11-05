package com.newbie.mypage.ocr.service;

import com.newbie.mypage.util.MultipartFileResource;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class OcrService {

    @Value("${naver.ocr.api.url}")
    private String apiURL;

    @Value("${naver.ocr.api.key}")
    private String secretKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final TicketParser ticketParser = new TicketParser();

    public Map<String, Object> callApiAndProcessTicket(MultipartFile image) throws IOException, java.text.ParseException, ParseException {
        // OCR API 호출
        List<String> extractedTexts = callApi(image);

        // OCR 결과를 JSON 배열로 변환 후 티켓 정보 파싱
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(extractedTexts);
        return ticketParser.parseTicketInfo(jsonArray);
    }

    private List<String> callApi(MultipartFile image) throws IOException, ParseException {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.MULTIPART_FORM_DATA);
        headers.set("X-OCR-SECRET", secretKey);

        JSONObject messageJson = new JSONObject();
        messageJson.put("version", "V1");
        messageJson.put("requestId", UUID.randomUUID().toString());
        messageJson.put("timestamp", System.currentTimeMillis());

        JSONObject imageObject = new JSONObject();
        imageObject.put("format", "jpg");
        imageObject.put("name", "hello");

        JSONArray imagesArray = new JSONArray();
        imagesArray.add(imageObject);
        messageJson.put("images", imagesArray);

        MultiValueMap<String, Object> body = new LinkedMultiValueMap<>();
        body.add("message", messageJson.toJSONString());
        body.add("file", new MultipartFileResource(image));

        HttpEntity<MultiValueMap<String, Object>> requestEntity = new HttpEntity<>(body, headers);

        ResponseEntity<String> response = restTemplate.exchange(apiURL, HttpMethod.POST, requestEntity, String.class);
        log.info("OCR API 호출 결과: {}", response.getBody());
        if (response.getStatusCode() == HttpStatus.OK) {
            return parseOcrResult(response.getBody());
        } else {
            throw new RuntimeException("OCR 요청 실패: " + response.getBody());
        }
    }

    private List<String> parseOcrResult(String responseBody) throws ParseException {
        List<String> resultTexts = new ArrayList<>();
        JSONParser parser = new JSONParser();
        JSONObject jsonResponse = (JSONObject) parser.parse(responseBody);
        JSONArray imagesArray = (JSONArray) jsonResponse.get("images");

        if (imagesArray != null && !imagesArray.isEmpty()) {
            JSONObject firstImage = (JSONObject) imagesArray.get(0);
            JSONArray fields = (JSONArray) firstImage.get("fields");
            for (Object fieldObj : fields) {
                JSONObject field = (JSONObject) fieldObj;
                resultTexts.add((String) field.get("inferText"));
            }
        }
        return resultTexts;
    }
}
