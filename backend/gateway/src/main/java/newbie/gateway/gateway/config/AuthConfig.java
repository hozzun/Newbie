package newbie.gateway.gateway.config;

import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.core.Authentication;
import reactor.core.publisher.Mono;

@Configuration
public class AuthConfig {

    @Bean
    public ReactiveAuthenticationManager authenticationManager() {
        return authentication -> Mono.just(authentication);
    }
}
