package newbie.gateway.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/", "/api/v1/login/**", "/api/v1/members/**").permitAll() // 인증 없이 접근 가능 경로
                        .anyExchange().authenticated()  // 그 외 경로는 인증 필요
                );

        return http.build();
    }
}
