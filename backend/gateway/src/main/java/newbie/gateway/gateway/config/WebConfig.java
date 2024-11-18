package newbie.gateway.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.CorsWebFilter;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.reactive.config.WebFluxConfigurer;

import java.util.List;

@Configuration
public class WebConfig {

    @Bean
    public CorsWebFilter customCorsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();
        config.setAllowedOrigins(List.of("http://localhost:5173", "https://k11b304.p.ssafy.io")); // 허용할 Origin 추가
        config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS")); // 허용할 HTTP 메서드 설정
        config.setAllowedHeaders(List.of("Authorization", "Cache-Control", "Content-Type", "X-Member-ID", "X-Nickname")); // 허용할 헤더 설정
        config.setExposedHeaders(List.of("Authorization")); // 클라이언트에서 접근 가능한 헤더 설정
        config.setAllowCredentials(true); // 인증 정보 포함 허용

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}


