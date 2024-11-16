package newbie.gateway.gateway.jwt;

import io.netty.util.concurrent.ImmediateEventExecutor;
import lombok.extern.slf4j.Slf4j;
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

@Slf4j
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
                    Long memberId = jwtUtil.getMemberIdFromToken(token);
                    String email = jwtUtil.getEmailFromToken(token);

                    log.info(memberId.toString());
                    log.info(email);

                    // 사용자 정보를 컨텍스트에 저장
                    exchange.getAttributes().put("userId", memberId.toString());
                    exchange.getAttributes().put("email", email);

                    return Mono.just(new UsernamePasswordAuthenticationToken(
                            memberId, null, new ArrayList<>()));
                }
            }
            return Mono.empty();
        }
    }

}
