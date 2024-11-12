package com.newbie.board.config;

import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class SwaggerConfig {

    @Value("${server.domain}")
    private String domain;

    @Bean
    public OpenAPI openAPI() {
        return new OpenAPI()
                .info(new Info().title("API Document").description("게시판 명세서").version("v1"))
                .addServersItem(new Server().url(domain));
    }
}