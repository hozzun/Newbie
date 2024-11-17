package newbie.gateway.gateway.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    // JWT 검증 메서드
    public Claims getClaimsFromToken(String token) {
        return Jwts.parser()
                .setSigningKey(secretKey)
                .parseClaimsJws(token)
                .getBody();
    }

    public boolean validateToken(String token) {
        try {
            getClaimsFromToken(token);
            return true;
        } catch (Exception e) {
            return false;
        }
    }

    // JWT에서 memberId를 Long 타입으로 추출하는 메서드
    public Long getMemberIdFromToken(String token) {
        return getClaimsFromToken(token).get("memberId", Long.class);
    }

    // JWT에서 nickname 추출 메서드
    public String getNicknameFromToken(String token) {
        return getClaimsFromToken(token).get("nickname", String.class);
    }
}
