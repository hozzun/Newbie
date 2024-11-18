package newbie.gateway.gateway.jwt;

import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import newbie.gateway.gateway.exception.CustomException;
import newbie.gateway.gateway.exception.MainException;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.core.io.buffer.DataBuffer;
import org.springframework.core.io.buffer.DataBufferUtils;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.HttpStatus;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpRequestDecorator;
import org.springframework.http.server.reactive.ServerHttpResponse;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import org.springframework.web.server.WebFilter;
import org.springframework.web.server.WebFilterChain;
import reactor.core.publisher.Flux;
import reactor.core.publisher.Mono;

import java.util.List;
import java.util.Map;

@Component
@Slf4j
@RequiredArgsConstructor
public class JwtAuthenticationFilter implements WebFilter {

    private final JwtUtil jwtUtil;

    private static final String MEMBER_ID_HEADER = "X-Member-ID";
    private static final String NICKNAME_HEADER = "X-Nickname";
    private static final String EMAIL_HEADER = "X-Email";

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, WebFilterChain chain) {
        ServerHttpRequest request = exchange.getRequest();
        log.info("Incoming request: {}", request.getURI());

        // OPTIONS 요청은 필터를 통과
        if (request.getMethod() == HttpMethod.OPTIONS) {
            return chain.filter(exchange);
        }

        String path = request.getURI().getPath();

        // 인증이 필요 없는 경로
        if (isAllowedPath(path)) {
            return chain.filter(exchange);
        }

        // Authorization 헤더 확인
        List<String> authHeader = request.getHeaders().get(HttpHeaders.AUTHORIZATION);
        if (authHeader == null || authHeader.isEmpty()) {
            log.warn("Authorization header is missing.");
            return onError(exchange, CustomException.INVALID_TOKEN);
        }

        try {
            String token = authHeader.get(0).substring(7); // Bearer 제거
            Map<String, Object> userInfo = jwtUtil.validateToken(token);

            Long userId = (Long) userInfo.get("memberId");
            String nickname = (String) userInfo.get("nickname");
            String email = (String) userInfo.get("email");
            log.info("JWT validation successful. UserID: {}, Nickname: {}, Email: {}", userId, nickname, email);

            // 본문이 없는 요청 처리 (GET, DELETE, 본문이 없는 POST/PUT/PATCH)
            if (request.getHeaders().getContentLength() == 0 || !hasRequestBody(request)) {
                ServerHttpRequest mutatedRequest = addHeaders(request, userId, nickname, email);
                ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                return chain.filter(mutatedExchange);
            }

            // 본문이 있는 요청 처리
            return DataBufferUtils.join(request.getBody())
                    .flatMap(dataBuffer -> {
                        byte[] bytes = new byte[dataBuffer.readableByteCount()];
                        dataBuffer.read(bytes);
                        DataBufferUtils.release(dataBuffer); // DataBuffer 해제

                        String body = new String(bytes);
                        log.info("Request Body: {}", body);

                        ServerHttpRequest mutatedRequest = new ServerHttpRequestDecorator(request) {
                            @Override
                            public HttpHeaders getHeaders() {
                                return addHeaders(request, userId, nickname, email).getHeaders();
                            }

                            @Override
                            public Flux<DataBuffer> getBody() {
                                return Flux.just(exchange.getResponse().bufferFactory().wrap(bytes));
                            }
                        };

                        ServerWebExchange mutatedExchange = exchange.mutate().request(mutatedRequest).build();
                        return chain.filter(mutatedExchange);
                    });
        } catch (MainException e) {
            log.error("JWT validation failed: {}", e.getMessage());
            return onError(exchange, CustomException.INVALID_TOKEN);
        } catch (Exception e) {
            log.error("Unexpected error during JWT validation.", e);
            return onError(exchange, CustomException.INVALID_TOKEN);
        }
    }

    private ServerHttpRequest addHeaders(ServerHttpRequest request, Long userId, String nickname, String email) {
        return new ServerHttpRequestDecorator(request) {
            @Override
            public HttpHeaders getHeaders() {
                HttpHeaders headers = new HttpHeaders();
                headers.putAll(super.getHeaders());

                // 중복 방지: 기존 헤더 제거
                headers.remove(MEMBER_ID_HEADER);
                headers.remove(NICKNAME_HEADER);
                headers.remove(EMAIL_HEADER);

                // 새로운 헤더 추가
                headers.add(MEMBER_ID_HEADER, String.valueOf(userId));
                headers.add(NICKNAME_HEADER, nickname);
                headers.add(EMAIL_HEADER, email);
                return headers;
            }
        };
    }

    private boolean hasRequestBody(ServerHttpRequest request) {
        // Transfer-Encoding 또는 Content-Length를 확인하여 본문 유무 판단
        HttpHeaders headers = request.getHeaders();
        return headers.containsKey(HttpHeaders.TRANSFER_ENCODING) ||
                (headers.containsKey(HttpHeaders.CONTENT_LENGTH) && headers.getContentLength() > 0);
    }




    private boolean isAllowedPath(String path) {
        // 인증이 필요 없는 경로 정의
        return path.startsWith("/api/v1/auth/login") ||
                path.startsWith("/api/v1/auth/members/signup");
    }

    private Mono<Void> onError(ServerWebExchange exchange, CustomException exception) {
        // 401 에러 처리
        exchange.getResponse().setStatusCode(HttpStatus.UNAUTHORIZED); // 예외에 따라 직접 설정
        return exchange.getResponse().setComplete();
    }
}
