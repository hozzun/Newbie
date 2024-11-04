package com.newbie.cardstore.usercard.service;

import com.newbie.cardstore.config.CustomException;
import com.newbie.cardstore.config.ErrorCode;
import com.newbie.cardstore.usercard.dto.MileageDeductionDto;
import com.newbie.cardstore.usercard.dto.PurchaseDto;
import com.newbie.cardstore.usercard.entity.UserCard;
import com.newbie.cardstore.usercard.repository.UserCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.text.SimpleDateFormat;
import java.util.Date;

@Service
@RequiredArgsConstructor
@Slf4j
public class PurchaseService {

    private final RabbitTemplate rabbitTemplate;
    private final UserCardRepository userCardRepository;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key}")
    private String routingKey;

    public boolean checkMileage(int userId, double price) {
        String url = "http://localhost:8081/check-mileage?userId=" + userId + "&price=" + price;
        log.info("Sending request to check mileage for userId: {}, price: {}", userId, price);

        ResponseEntity<Boolean> response = restTemplate.getForEntity(url, Boolean.class);

        if (response.getBody() != null && response.getBody()) {
            log.info("Mileage check successful for userId: {}", userId);
            return true;
        } else {
            log.warn("Insufficient mileage for userId: {}", userId);
            return false;
        }
    }

    public UserCard purchaseCard(PurchaseDto purchaseDto) {
        log.info("Starting purchaseCard with PurchaseDto: {}", purchaseDto);

        ObjectId cardObjectId;

        try {
            cardObjectId = new ObjectId(purchaseDto.getCardId());
            log.info("Converted cardId to ObjectId: {}", cardObjectId);
        } catch (IllegalArgumentException e) {
            log.error("Invalid cardId format: {}", purchaseDto.getCardId(), e);
            throw new CustomException(ErrorCode.INVALID_CARD_ID);
        }

        boolean isCardAlreadyPurchased = userCardRepository.existsByUserIdAndCardId(purchaseDto.getUserId(), cardObjectId);
        if (isCardAlreadyPurchased) {
            log.error("User {} has already purchased the card {}", purchaseDto.getUserId(), cardObjectId);
            throw new CustomException(ErrorCode.CARD_ALREADY_PURCHASED);
        }

        if (checkMileage(purchaseDto.getUserId(), purchaseDto.getPrice())) {
            if (sendMileageDeductionRequest(purchaseDto.getUserId(), purchaseDto.getPrice())) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String createdAt = dateFormat.format(new Date());

                UserCard userCard = UserCard.builder()
                        .userId(purchaseDto.getUserId())
                        .cardId(cardObjectId)
                        .createdAt(createdAt)
                        .build();

                UserCard savedUserCard = userCardRepository.save(userCard);
                log.info("UserCard saved successfully: {}", savedUserCard);

                return savedUserCard;
            } else {
                log.error("Failed to send mileage deduction request for userId: {}", purchaseDto.getUserId());
                throw new CustomException(ErrorCode.MILEAGE_CHECK_FAILED);
            }
        } else {
            log.error("Insufficient mileage for userId: {}, purchase price: {}", purchaseDto.getUserId(), purchaseDto.getPrice());
            throw new CustomException(ErrorCode.INSUFFICIENT_MILEAGE);
        }
    }

    /**
     * 마일리지 차감 요청 메시지를 RabbitMQ로 전송
     */
    private boolean sendMileageDeductionRequest(int userId, double amount) {
        MileageDeductionDto mileageDeductionDto = new MileageDeductionDto(userId, amount, "deduct", "purchase");
        log.info("Sending mileage deduction request: {}", mileageDeductionDto);

        try {
            rabbitTemplate.convertAndSend(exchangeName, routingKey, mileageDeductionDto);
            log.info("마일리지 차감 성공", userId);
            return true;
        } catch (Exception e) {
            log.error("마일리지 차감 실패", userId, e);
            return false;
        }
    }

}
