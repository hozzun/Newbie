package newbie.gateway.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

import java.util.Arrays;

@Configuration
public class CorsConfig {

    @Bean
    public CorsWebFilter corsWebFilter() {
        CorsConfiguration config = new CorsConfiguration();

        // 허용할 Origins: 로컬 주소 및 서버 배포 주소 추가
        config.setAllowedOrigins(Arrays.asList(
                "http://localhost:5173",
                "https://k11b304.p.ssafy.io"));

        // 모든 헤더와 메서드 허용
        config.addAllowedHeader("*");
        config.addAllowedMethod("*");

        // 자격 증명 허용 (JWT 쿠키나 인증 정보를 허용할 경우)
        config.setAllowCredentials(true);

        UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
        source.registerCorsConfiguration("/**", config);

        return new CorsWebFilter(source);
    }
}
