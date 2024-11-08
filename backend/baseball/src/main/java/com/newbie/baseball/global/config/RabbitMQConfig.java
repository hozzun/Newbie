package com.newbie.baseball.global.config;

import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.amqp.core.Queue;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class RabbitMQConfig {

    @Value("${rabbitmq.queue.likePlayerQueue}")
    private String likePlayerQueue;

    @Value("${rabbitmq.queue.checkPlayerQueue}")
    private String checkPlayerQueue;

    @Value("${rabbitmq.exchange.likeExchange}")
    private String likeExchange;

    @Value("${rabbitmq.exchange.checkExchange}")
    private String checkExchange;

    @Value("${rabbitmq.routing.key.like}")
    private String likePlayerRoutingKey;

    @Value("${rabbitmq.routing.key.check}")
    private String checkPlayerRoutingKey;

    @Bean
    public Queue likePlayerQueue() {
        return new Queue(likePlayerQueue, false);
    }

    @Bean
    public Queue checkPlayerQueue() {
        return new Queue(checkPlayerQueue, false);
    }

    @Bean
    public DirectExchange likeExchange() {
        return new DirectExchange(likeExchange);
    }

    @Bean
    public DirectExchange checkExchange() {
        return new DirectExchange(checkExchange);
    }

    @Bean
    public Binding bindingLikePlayerQueue() {
        return BindingBuilder.bind(likePlayerQueue()).to(likeExchange()).with(likePlayerRoutingKey);
    }

    @Bean
    public Binding bindingCheckPlayerQueue() {
        return BindingBuilder.bind(checkPlayerQueue()).to(checkExchange()).with(checkPlayerRoutingKey);
    }


    @Bean
    public Jackson2JsonMessageConverter messageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public RabbitTemplate rabbitTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return template;
    }
}
