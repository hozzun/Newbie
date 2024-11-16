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

    // JWT 생성 메서드 - memberId와 email 사용
    public String generateToken(Long memberId, String email) {
        return Jwts.builder()
                .setSubject(String.valueOf(memberId)) // memberId를 String으로 변환
                .claim("email", email) // email을 claim에 추가
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

    // JWT에서 memberId를 Long 타입으로 추출하는 메서드
    public Long getMemberIdFromToken(String token) {
        return getClaimsFromToken(token).get("memberId", Long.class);
    }

    // JWT에서 email 추출 메서드
    public String getEmailFromToken(String token) {
        return getClaimsFromToken(token).get("email", String.class);
    }
}
