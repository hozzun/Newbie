package com.newbie.auth.global.common.config;

import lombok.Data;
import org.springframework.boot.context.properties.ConfigurationProperties;
import org.springframework.context.annotation.Configuration;

@Data
@Configuration
@ConfigurationProperties(prefix = "rabbitmq")
public class RabbitMqProperties {

    private String host;
    private int port;
    private String username;
    private String password;
}

