package newbie.gateway.gateway.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.ExpiredJwtException;
import io.jsonwebtoken.JwtException;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.security.Keys;
import lombok.extern.slf4j.Slf4j;
import newbie.gateway.gateway.exception.CustomException;
import newbie.gateway.gateway.exception.MainException;
import org.apache.commons.lang3.tuple.Pair;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import javax.crypto.SecretKey;
import java.util.Base64;
import java.util.HashMap;
import java.util.Map;

@Component
@Slf4j
public class JwtUtil {

    private final SecretKey key;

    public JwtUtil(@Value("${jwt.secret}") String secretKey) {
        byte[] decodedKey = Base64.getDecoder().decode(secretKey);
        this.key = Keys.hmacShaKeyFor(decodedKey);
        log.info("JWT Secret Key successfully initialized.");
    }

    /**
     * JWT 검증 및 클레임 추출
     *
     * @param token JWT 문자열
     * @return userId 문자열
     * @throws MainException 검증 실패 시 예외 발생
     */
    public Map<String, Object> validateToken(String token) throws MainException {
        if (!isValidJwtFormat(token)) {
            log.warn("JWT validation failed: Invalid format. Token: {}", token);
            throw new MainException(CustomException.INVALID_TOKEN);
        }

        try {
            Claims claims = Jwts.parserBuilder()
                    .setSigningKey(key)
                    .build()
                    .parseClaimsJws(token)
                    .getBody();
            log.debug("JWT Claims: {}", claims);

            Long memberId = claims.get("memberId", Long.class);
            String nickname = claims.get("nickname", String.class);
            String email = claims.get("email", String.class);

            if (memberId == null) {
                log.error("JWT validation failed: memberId is null in claims.");
                throw new MainException(CustomException.INVALID_TOKEN);
            }

            // Map에 결과 저장
            Map<String, Object> result = new HashMap<>();
            result.put("memberId", memberId);
            result.put("nickname", nickname);
            result.put("email", email);

            return result;

        } catch (ExpiredJwtException e) {
            log.warn("JWT validation failed: Token expired.", e);
            throw new MainException(CustomException.EXPIRED_TOKEN);
        } catch (JwtException e) {
            log.warn("JWT validation failed: Invalid token.", e);
            throw new MainException(CustomException.INVALID_TOKEN);
        } catch (Exception e) {
            log.error("Unexpected error during JWT validation.", e);
            throw new MainException(CustomException.INTERNAL_SERVER_ERROR);
        }
    }


    private boolean isValidJwtFormat(String token) {
        return token != null && token.chars().filter(ch -> ch == '.').count() == 2;
    }

    public Long getUserId(String token) {
        Claims claims = getClaims(token);
        return claims.get("memberId", Long.class);
    }

    public String getNickname(String token) {
        Claims claims = getClaims(token);
        return claims.get("email", String.class);
    }

    private Claims getClaims(String token) {
        return Jwts.parserBuilder()
                .setSigningKey(key)
                .build()
                .parseClaimsJws(token)
                .getBody();
    }
}
