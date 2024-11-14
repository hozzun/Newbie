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

    // JWT 생성 메서드
    public String generateToken(String userId, String username) {
        return Jwts.builder()
                .setSubject(userId)
                .claim("name", username)
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

    // JWT에서 userId 추출 메서드
    public String getUserIdFromToken(String token) {
        return getClaimsFromToken(token).getSubject();
    }

    // JWT에서 name 추출 메서드
    public String getUsernameFromToken(String token) {
        return getClaimsFromToken(token).get("name", String.class);
    }
}
