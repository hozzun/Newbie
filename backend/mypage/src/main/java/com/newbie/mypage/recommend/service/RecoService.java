package com.newbie.mypage.recommend.service;

import com.newbie.mypage.recommend.dto.RecoRequestDto;
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

    public RecoResponseDto recommendTeam(RecoRequestDto requestDto) {
        HttpHeaders headers = new HttpHeaders();
        headers.set("Content-Type", "application/json");

        HttpEntity<RecoRequestDto> requestEntity = new HttpEntity<>(requestDto, headers);

        try {
            ResponseEntity<RecoResponseDto> response = restTemplate.exchange(
                    fastApiUrl, HttpMethod.POST, requestEntity, RecoResponseDto.class);
            RecoResponseDto recoResponse = response.getBody();

            if (recoResponse != null) {
                rabbitTemplate.convertAndSend(exchangeName, routingKey, recoResponse);
                log.info("RabbitMQ로 추천 결과 전송: {}", recoResponse);
            }

            return recoResponse;
        } catch (Exception e) {
            throw new RuntimeException("추천 요청 실패: " + e.getMessage());
        }
    }
}
