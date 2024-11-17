package com.newbie.auth.global.common.config;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class RabbitMqPublisher {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.auth.exchange}")
    private String authExchange;

    @Value("${rabbitmq.auth.routing.key}")
    private String authRoutingKey;

    public void sendResignEvent(Long userId) {
        rabbitTemplate.convertAndSend(authExchange, authRoutingKey, userId);
    }
}

