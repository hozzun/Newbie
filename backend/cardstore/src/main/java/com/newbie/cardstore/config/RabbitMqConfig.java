package com.newbie.cardstore.config;

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

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key.mileage}")
    private String mileageRoutingKey;

    @Value("${rabbitmq.routing.key.player}")
    private String playerRoutingKey;

    @Value("${rabbitmq.queue.name.mileage}")
    private String mileageQueueName;

    @Value("${rabbitmq.queue.name.player}")
    private String playerQueueName;

    // mileage Queue 생성
    @Bean
    public Queue mileageQueue() {
        return new Queue(mileageQueueName);
    }

    // player Queue 생성
    @Bean
    public Queue playerQueue() {
        return new Queue(playerQueueName);
    }

    /**
     * 지정된 Exchange 이름으로 Direct Exchange Bean 생성
     */
    @Bean
    public DirectExchange directExchange() {
        return new DirectExchange(exchangeName);
    }

    /**
     * mileage Queue와 Exchange를 Binding
     */
    @Bean
    public Binding mileageBinding(Queue mileageQueue, DirectExchange exchange) {
        return BindingBuilder.bind(mileageQueue).to(exchange).with(mileageRoutingKey);
    }

    /**
     * player Queue와 Exchange를 Binding
     */
    @Bean
    public Binding playerBinding(Queue playerQueue, DirectExchange exchange) {
        return BindingBuilder.bind(playerQueue).to(exchange).with(playerRoutingKey);
    }

    /**
     * RabbitMQ 연동을 위한 ConnectionFactory 빈 생성
     */
    @Bean
    public CachingConnectionFactory connectionFactory() {
        CachingConnectionFactory connectionFactory = new CachingConnectionFactory();
        connectionFactory.setHost(rabbitMqProperties.getHost());
        connectionFactory.setPort(rabbitMqProperties.getPort());
        connectionFactory.setUsername(rabbitMqProperties.getUsername());
        connectionFactory.setPassword(rabbitMqProperties.getPassword());
        return connectionFactory;
    }

    /**
     * RabbitTemplate
     */
    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jackson2JsonMessageConverter());
        return rabbitTemplate;
    }

    /**
     * 직렬화(메세지를 JSON 으로 변환하는 Message Converter)
     */
    @Bean
    public MessageConverter jackson2JsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }
}
