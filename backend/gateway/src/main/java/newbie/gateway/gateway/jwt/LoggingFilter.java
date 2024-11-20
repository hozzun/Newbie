package newbie.gateway.gateway.jwt;

import lombok.extern.slf4j.Slf4j;
import org.springframework.cloud.gateway.filter.GlobalFilter;
import org.springframework.core.annotation.Order;
import org.springframework.http.server.reactive.ServerHttpRequest;
import org.springframework.http.server.reactive.ServerHttpResponseDecorator;
import org.springframework.stereotype.Component;
import org.springframework.web.server.ServerWebExchange;
import reactor.core.publisher.Mono;

import java.nio.charset.StandardCharsets;

@Slf4j
@Component
@Order(0)
public class LoggingFilter implements GlobalFilter {

    @Override
    public Mono<Void> filter(ServerWebExchange exchange, org.springframework.cloud.gateway.filter.GatewayFilterChain chain) {
        // 요청 로깅
        return logRequest(exchange)
                .then(Mono.defer(() -> {
                    // 응답 로깅
                    ServerHttpResponseDecorator decoratedResponse = logResponse(exchange);
                    return chain.filter(exchange.mutate().response(decoratedResponse).build());
                }));
    }

    private Mono<Void> logRequest(ServerWebExchange exchange) {
        ServerHttpRequest request = exchange.getRequest();
        log.info("Request Path: {}", request.getURI().getPath());
        log.info("Request Headers: {}", request.getHeaders());

        return exchange.getRequest().getBody().doOnNext(dataBuffer -> {
            byte[] content = new byte[dataBuffer.readableByteCount()];
            dataBuffer.read(content);
            log.info("Request Body: {}", new String(content, StandardCharsets.UTF_8));
        }).then();
    }

    private ServerHttpResponseDecorator logResponse(ServerWebExchange exchange) {
        return new ServerHttpResponseDecorator(exchange.getResponse()) {
            @Override
            public Mono<Void> writeWith(org.reactivestreams.Publisher<? extends org.springframework.core.io.buffer.DataBuffer> body) {
                if (body instanceof reactor.core.publisher.Flux) {
                    return super.writeWith(
                            ((reactor.core.publisher.Flux<org.springframework.core.io.buffer.DataBuffer>) body).doOnNext(dataBuffer -> {
                                byte[] content = new byte[dataBuffer.readableByteCount()];
                                dataBuffer.read(content);
                                log.info("Response Body: {}", new String(content, StandardCharsets.UTF_8));
                            })
                    );
                }
                return super.writeWith(body);
            }
        };
    }
}
