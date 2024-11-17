package com.newbie.board.config;


import com.newbie.board.generalBoard.dto.MileageUpdateMessage;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

@Service
public class BoardMileageProducer {

    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.board.routing.key}")
    private String boardRoutingKey;

    public BoardMileageProducer(RabbitTemplate rabbitTemplate) {
        this.rabbitTemplate = rabbitTemplate;
    }

    public void sendMileageUpdate(int userId, int amount, String reason) {
        MileageUpdateMessage message = new MileageUpdateMessage(userId, amount, reason);
        rabbitTemplate.convertAndSend(exchangeName, boardRoutingKey, message);
    }
}
