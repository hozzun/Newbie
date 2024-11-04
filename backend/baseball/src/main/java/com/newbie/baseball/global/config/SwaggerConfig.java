package com.newbie.baseball.global.config;

import io.swagger.v3.oas.models.Components;
import io.swagger.v3.oas.models.OpenAPI;
import io.swagger.v3.oas.models.info.Info;
import io.swagger.v3.oas.models.security.SecurityRequirement;
import io.swagger.v3.oas.models.security.SecurityScheme;
import io.swagger.v3.oas.models.servers.Server;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import java.util.List;

@Configuration
public class SwaggerConfig {

    @Bean
    public OpenAPI openAPI() {
//        String jwt = "JWT";
//        SecurityRequirement securityRequirement = new SecurityRequirement().addList(jwt);
//        Components components = new Components().addSecuritySchemes(jwt, new SecurityScheme()
//                .name(jwt)
//                .type(SecurityScheme.Type.HTTP)
//                .scheme("bearer")
//                .bearerFormat("JWT")
//        );

        // HTTPS Server 추가
        Server server1 = new Server()
                .url("https://k11b304.p.ssafy.io/api/v1")
                .description("newbie");
        Server server2 = new Server()
                .url("http://localhost:8080/api/v1")
                .description("local");
        return new OpenAPI()
                .components(new Components())
                .info(apiInfo())
//                .addSecurityItem(securityRequirement)
//                .components(components)
                .servers(List.of(server1,server2));
    }

    private Info apiInfo() {
        return new Info()
                .title("Newbie 야구 API")
                .description("BaseBall API")
                .version("1.0.0");
    }
}