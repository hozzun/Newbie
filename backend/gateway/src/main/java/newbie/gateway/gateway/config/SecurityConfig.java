package newbie.gateway.gateway.config;

import newbie.gateway.gateway.jwt.JwtAuthenticationFilter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.web.reactive.EnableWebFluxSecurity;
import org.springframework.security.config.web.server.SecurityWebFiltersOrder;
import org.springframework.security.config.web.server.ServerHttpSecurity;
import org.springframework.security.web.server.SecurityWebFilterChain;
import org.springframework.security.web.server.context.NoOpServerSecurityContextRepository;

@Configuration
@EnableWebFluxSecurity
public class SecurityConfig {

    private final JwtAuthenticationFilter jwtAuthenticationFilter;

    public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter) {
        this.jwtAuthenticationFilter = jwtAuthenticationFilter;
    }

    @Bean
    public SecurityWebFilterChain securityWebFilterChain(ServerHttpSecurity http) {
        http
                .csrf(csrf -> csrf.disable())  // CSRF 비활성화
                .authorizeExchange(exchange -> exchange
                        .pathMatchers("/", "/api/v1/login/**", "/api/v1/members/signup").permitAll() // 인증 없이 접근 가능 경로
                        .anyExchange().authenticated()  // 그 외 경로는 인증 필요
                )
                .addFilterAt(jwtAuthenticationFilter, SecurityWebFiltersOrder.AUTHENTICATION) // JwtAuthenticationFilter 추가
                .securityContextRepository(NoOpServerSecurityContextRepository.getInstance()); // 상태 없는 세션 (JWT 기반)

        return http.build();
    }
}
