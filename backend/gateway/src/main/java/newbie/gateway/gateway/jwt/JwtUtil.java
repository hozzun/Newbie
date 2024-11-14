package newbie.gateway.gateway.jwt;

import io.jsonwebtoken.Claims;
import io.jsonwebtoken.Jwts;
import io.jsonwebtoken.SignatureAlgorithm;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

import java.util.Date;

@Component
public class JwtUtil {

    @Value("${jwt.secret}")
    private String secretKey;

    @Value("${jwt.expiration}")
    private long expiration;

    // JWT 생성 메서드 - username 대신 nickname 사용
    public String generateToken(Long userId, String nickname) {
        return Jwts.builder()
                .setSubject(String.valueOf(userId)) // userId를 String으로 변환
                .claim("nickname", nickname) // nickname을 claim에 추가
                .setIssuedAt(new Date())
                .setExpiration(new Date(System.currentTimeMillis() + expiration))
                .signWith(SignatureAlgorithm.HS256, secretKey)
                .compact();
    }

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

    // JWT에서 userId를 Long 타입으로 추출하는 메서드
    public Long getUserIdFromToken(String token) {
        return Long.parseLong(getClaimsFromToken(token).getSubject());
    }

    // JWT에서 nickname 추출 메서드
    public String getNicknameFromToken(String token) {
        return getClaimsFromToken(token).get("nickname", String.class);
    }
}
