package com.newbie.mypage.watch_game.service;

import com.newbie.mypage.s3.S3Service;
import com.newbie.mypage.util.MultipartFileResource;
import com.newbie.mypage.watch_game.entity.Ticket;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.json.simple.parser.JSONParser;
import org.json.simple.parser.ParseException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.ArrayList;
import java.util.List;
import java.util.Map;
import java.util.UUID;

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
    private final S3Service s3Service;


    /**
     * 티켓을 받아 OCR 분석 후, 사용자 정보 저장 및 OCR 해석 결과 반환
     * @param image
     * @param memberId
     * @return
     * @throws IOException
     * @throws java.text.ParseException
     * @throws ParseException
     */
    @Transactional
    public Map<String, Object> processAndSaveTicket(MultipartFile image, String memberId) throws IOException, java.text.ParseException, ParseException {
        int userId = Integer.parseInt(memberId);
        // OCR API 호출 및 결과 처리
        List<String> extractedTexts = callApi(image);

        // OCR 결과를 JSON 배열로 변환 후 티켓 정보 파싱
        JSONArray jsonArray = new JSONArray();
        jsonArray.addAll(extractedTexts);
        Map<String, Object> ticketInfo = ticketParser.parseTicketInfo(jsonArray);

        // 파싱된 정보에서 필요한 데이터를 추출
        String date = (String) ticketInfo.get("date");
        String time = (String) ticketInfo.get("time");
        String team1English = ((List<String>) ticketInfo.get("teamEnglish")).get(0);
        String team2English = ((List<String>) ticketInfo.get("teamEnglish")).get(1);
        String team1Korean = ((List<String>) ticketInfo.get("teamKorean")).get(0);
        String team2Korean = ((List<String>) ticketInfo.get("teamKorean")).get(1);

        // S3에 이미지 업로드 및 URL 반환
        Ticket ticket = s3Service.saveFile(image, userId, date, time, team1English, team2English, team1Korean, team2Korean);

        // 이미지 URL을 포함한 티켓 정보를 반환
        ticketInfo.put("ticketId", ticket.getId());
        ticketInfo.put("imageUrl", ticket.getImageUrl());
        ticketInfo.put("userId", ticket.getUserId());
        ticketInfo.put("createdAt", ticket.getCreatedAt());
        log.info(ticketInfo.toString());

        return ticketInfo;
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
