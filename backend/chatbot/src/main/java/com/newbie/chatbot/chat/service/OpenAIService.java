package com.newbie.chatbot.chat.service;

import com.newbie.chatbot.chat.dto.ChatRequestDto;
import com.newbie.chatbot.chat.dto.MessageDto;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
@Slf4j
@RequiredArgsConstructor
public class OpenAIService {

    @Value("${openai.api.key}")
    private String apiKey;

    private final RestTemplate restTemplate = new RestTemplate();
    private final ChatRoomService chatRoomService;

    public MessageDto generateAnswer(String question, String roomId) {
        log.info("Question: {}, Room ID: {}", question, roomId);

        // OpenAI API에서 요구하는 messages 필드를 구성
        Map<String, Object> userMessage = new HashMap<>();
        userMessage.put("role", "user");
        userMessage.put("content", question);

        Map<String, Object> requestBody = new HashMap<>();
        requestBody.put("model", "ft:gpt-4o-mini-2024-07-18:personal::AQQbnB1n");
        requestBody.put("messages", List.of(userMessage));
        requestBody.put("temperature", 0.7);
        requestBody.put("max_tokens", 150);

        HttpHeaders headers = new HttpHeaders();
        headers.set("Authorization", "Bearer " + apiKey);
        headers.set("Content-Type", "application/json");

        HttpEntity<Map<String, Object>> request = new HttpEntity<>(requestBody, headers);
        String apiUrl = "https://api.openai.com/v1/chat/completions";

        ResponseEntity<Map> response = restTemplate.exchange(apiUrl, HttpMethod.POST, request, Map.class);

        Map<String, Object> responseBody = response.getBody();
        log.info("AI Response: {}", responseBody);

        String aiResponse = "답변을 생성할 수 없습니다.";
        if (responseBody != null && responseBody.containsKey("choices")) {
            Map<String, Object> firstChoice = ((List<Map<String, Object>>) responseBody.get("choices")).get(0);
            Map<String, Object> message = (Map<String, Object>) firstChoice.get("message");
            aiResponse = (String) message.get("content");
        }

        // AI의 응답을 MessageDto로 생성
        MessageDto aiMessage = MessageDto.builder()
                .sender("AI")
                .content(aiResponse)
                .roomId(roomId)
                .timestamp(System.currentTimeMillis())
                .build();

        // AI 응답 메시지를 Redis에 저장
        chatRoomService.saveMessage(roomId, new ChatRequestDto(0, aiResponse, aiMessage.getTimestamp()));

        return aiMessage;
    }
}
