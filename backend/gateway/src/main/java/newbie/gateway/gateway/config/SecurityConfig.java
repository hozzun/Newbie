package newbie.gateway.gateway.config;

import lombok.RequiredArgsConstructor;
import newbie.gateway.gateway.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

@Configuration
@RequiredArgsConstructor
@EnableWebFluxSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                // CSRF 비활성화
                .csrf(csrf -> csrf.disable())

                // 경로에 따른 접근 권한 설정
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/api/v1/login/**", "/api/v1/members/signup").permitAll() // 인증 없이 접근 가능 경로
                        .pathMatchers("/api/v1/teams/**", "/api/v1/players/**").authenticated() // 인증 필요한 경로
                        .anyExchange().permitAll() // 나머지 경로는 인증 없이 허용 (필요에 따라 수정 가능)
                )

                // JwtAuthenticationFilter 등록
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION);

        return http.build();
    }
}
