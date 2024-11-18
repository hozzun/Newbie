package com.newbie.mypage.recommend.service;

import com.newbie.mypage.recommend.dto.RecoRequestDto;
import com.newbie.mypage.recommend.dto.RecoRequestFastApiDto;
import com.newbie.mypage.recommend.dto.RecoResponseDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

@Service
@RequiredArgsConstructor
@Slf4j
public class RecoService {

    private final RestTemplate restTemplate = new RestTemplate();
    private final RabbitTemplate rabbitTemplate;

    @Value("${club.recommend.server.domain}")
    private String fastApiUrl;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public ResponseEntity<RecoResponseDto> recommendTeam(RecoRequestDto requestDto, String userId) {
        // FastAPI 요청용 DTO 생성
        RecoRequestFastApiDto fastApiDto = RecoRequestFastApiDto.builder()
                .mbti(requestDto.getMbti())
                .responses(requestDto.getResponses())
                .region(requestDto.getRegion())
                .userId(userId) // userId 추가
                .build();

        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<RecoRequestFastApiDto> requestEntity = new HttpEntity<>(fastApiDto, headers);

        try {
            return restTemplate.exchange(
                    fastApiUrl, HttpMethod.POST, requestEntity, RecoResponseDto.class);
        } catch (Exception e) {
            throw new RuntimeException("추천 요청 실패: " + e.getMessage());
        }
    }
}
