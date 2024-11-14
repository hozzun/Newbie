package newbie.gateway.gateway.jwt;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpHeaders;
import org.springframework.security.authentication.ReactiveAuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.server.authentication.AuthenticationWebFilter;
import org.springframework.security.web.server.authentication.ServerAuthenticationConverter;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.util.ArrayList;

@Component
public class JwtAuthenticationFilter extends AuthenticationWebFilter {

    @Autowired
    public JwtAuthenticationFilter(JwtUtil jwtUtil, ReactiveAuthenticationManager authenticationManager) {
        super(authenticationManager);
        setServerAuthenticationConverter(new JwtAuthenticationConverter(jwtUtil));
    }

    private static class JwtAuthenticationConverter implements ServerAuthenticationConverter {

        private final JwtUtil jwtUtil;

        public JwtAuthenticationConverter(JwtUtil jwtUtil) {
            this.jwtUtil = jwtUtil;
        }

        @Override
        public Mono<Authentication> convert(ServerWebExchange exchange) {
            String token = exchange.getRequest().getHeaders().getFirst(HttpHeaders.AUTHORIZATION);
            if (token != null && token.startsWith("Bearer ")) {
                token = token.substring(7);
                if (jwtUtil.validateToken(token)) {

                    Long userId = jwtUtil.getUserIdFromToken(token);
                    String nickname = jwtUtil.getNicknameFromToken(token);

                    exchange.getRequest().mutate()
                            .header("user-id", userId.toString())
                            .header("user-nickname", nickname)
                            .build();

                    return Mono.just(new UsernamePasswordAuthenticationToken(
                            userId, null, new ArrayList<>()));
                }
            }
            return Mono.empty();
        }

    }
}
