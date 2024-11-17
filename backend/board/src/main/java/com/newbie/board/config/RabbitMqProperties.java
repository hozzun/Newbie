package com.newbie.board.config;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Configuration
@ConfigurationProperties(prefix = "spring.rabbitmq")
@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class RabbitMqProperties {
    private String host;
    private int port;
    private String username;
    private String password;
}
