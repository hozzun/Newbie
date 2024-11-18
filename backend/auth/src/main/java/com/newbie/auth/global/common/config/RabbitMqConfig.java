package com.newbie.auth.global.common.config;

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

@Configuration
@RequiredArgsConstructor
public class RabbitMqConfig {

    private final RabbitMqProperties rabbitMqProperties;

    @Value("${rabbitmq.auth.queue.name}")
    private String authQueueName;

    @Value("${rabbitmq.auth.routing.key}")
    private String authRoutingKey;

    @Value("${rabbitmq.auth.exchange}")
    private String authExchangeName;

    // Auth 관련 큐 정의
    @Bean
    public Queue authQueue() {
        return new Queue(authQueueName, true); // Durable 설정
    }

    // Auth 관련 Direct Exchange 정의
    @Bean
    public DirectExchange authExchange() {
        return new DirectExchange(authExchangeName);
    }

    // 큐와 교환기를 라우팅 키로 바인딩
    @Bean
    public Binding authBinding(Queue authQueue, DirectExchange authExchange) {
        return BindingBuilder.bind(authQueue).to(authExchange).with(authRoutingKey);
    }

    // RabbitMQ 연결 설정
    @Bean
    public ConnectionFactory connectionFactory() {
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
