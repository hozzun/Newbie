package com.newbie.mileage.config;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.CachingConnectionFactory;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@RequiredArgsConstructor
@Configuration
public class RabbitMqConfig {

    private final RabbitMqProperties rabbitMqProperties;

    @Value("${rabbitmq.queue.name}")
    private String queueName; // 기존 큐 이름

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName; // 공유 교환기 이름

    @Value("${rabbitmq.routing.key}")
    private String routingKey; // 기존 라우팅 키

    @Value("${rabbitmq.board.queue.name}") // board 서버를 위한 큐
    private String boardQueueName;

    @Value("${rabbitmq.board.routing.key}") // board 서버를 위한 라우팅 키
    private String boardRoutingKey;

    // 기존 큐
    @Bean
    public Queue queue() {
        return new Queue(queueName);
    }

    // board 서버 큐
    @Bean
    public Queue boardQueue() {
        return new Queue(boardQueueName);
    }

    // Direct Exchange
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(exchangeName);
    }

    // 기존 큐와 라우팅 키를 바인딩
    @Bean
    public Binding binding(Queue queue, DirectExchange exchange) {
        return BindingBuilder.bind(queue).to(exchange).with(routingKey);
    }

    // board 큐와 라우팅 키를 바인딩
    @Bean
    public Binding boardBinding(Queue boardQueue, DirectExchange exchange) {
        return BindingBuilder.bind(boardQueue).to(exchange).with(boardRoutingKey);
    }

    // RabbitMQ 연결 설정
    @Bean
    public CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitMqProperties.getHost());
        connectionFactory.setPort(rabbitMqProperties.getPort());
        connectionFactory.setUsername(rabbitMqProperties.getUsername());
        connectionFactory.setPassword(rabbitMqProperties.getPassword());
        return connectionFactory;
    }

    // RabbitTemplate 설정
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

    // JSON 직렬화 Message Converter
    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
