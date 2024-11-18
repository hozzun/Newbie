package com.newbie.cardstore.usercard.service;

import com.newbie.cardstore.config.CustomException;
import com.newbie.cardstore.config.ErrorCode;
import com.newbie.cardstore.storecard.entity.PlayerCard;
import com.newbie.cardstore.storecard.repository.PlayerCardRepository;
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
import java.util.HashSet;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PurchaseService {

    private final RabbitTemplate rabbitTemplate;
    private final UserCardRepository userCardRepository;
    private final RestTemplate restTemplate = new RestTemplate();
    private final PlayerCardRepository playerCardRepository;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key.mileage}")
    private String routingKey;

    @Value("${mileage.server.domain}")
    private String milesServerName;

    @Value("${server.path}")
    private String mileageServerPath;

    public boolean checkMileage(Long userId, double price) {
        String url = milesServerName + ":" + mileageServerPath + "/check-mileage?userId=" + userId + "&price=" + price;
        log.info(url);
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

    public void purchaseCard(String cardId, String memberId) {
        Long userId = Long.valueOf(memberId);

        ObjectId cardObjectId;
        try {
            cardObjectId = new ObjectId(cardId);
            log.info("Converted cardId to ObjectId: {}", cardObjectId);
        } catch (IllegalArgumentException e) {
            log.error("Invalid cardId format: {}", cardId, e);
            throw new CustomException(ErrorCode.INVALID_CARD_ID);
        }

        // 사용자가 이미 해당 카드를 보유하고 있는지 체크
        boolean isCardAlreadyPurchased = userCardRepository.existsByUserIdAndCardIdsContains(userId, cardObjectId);
        if (isCardAlreadyPurchased) {
            log.error("User {} has already purchased the card {}", userId, cardObjectId);
            throw new CustomException(ErrorCode.CARD_ALREADY_PURCHASED);
        }

        PlayerCard playerCard = playerCardRepository.findById(cardId)
                .orElseThrow(() -> new IllegalArgumentException("Card not found"));

        double price = playerCard.getPrice();
        // 마일리지 확인 후 구매 처리
        if (checkMileage(userId, price)) {
            if (sendMileageDeductionRequest(userId, price)) {
                SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
                String createdAt = dateFormat.format(new Date());

                // UserCard 가져오기 또는 새로 생성
                UserCard userCard = userCardRepository.findByUserId(userId).stream()
                        .findFirst()
                        .orElse(UserCard.builder()
                                .userId(userId)
                                .cardIds(new HashSet<>())
                                .createdAt(createdAt)
                                .build());

                // 새로운 cardId 추가
                userCard.getCardIds().add(cardObjectId);

                UserCard savedUserCard = userCardRepository.save(userCard);
                log.info("UserCard saved successfully: {}", savedUserCard);

            } else {
                log.error("Failed to send mileage deduction request for userId: {}", userId);
                throw new CustomException(ErrorCode.MILEAGE_CHECK_FAILED);
            }
        } else {
            log.error("Insufficient mileage for userId: {}, purchase price: {}", userId, price);
            throw new CustomException(ErrorCode.INSUFFICIENT_MILEAGE);
        }
    }


    /**
     * 마일리지 차감 요청 메시지를 RabbitMQ로 전송
     */
    private boolean sendMileageDeductionRequest(Long userId, double amount) {
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
