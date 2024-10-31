package com.login.login.domain.member.service;

import com.login.login.domain.member.dto.MemberDto;
import com.login.login.domain.member.dto.request.MemberLoginRequestDto;
import com.login.login.domain.member.dto.response.MemberLoginResponseDto;
import com.login.login.domain.member.entity.Member;
import com.login.login.domain.member.exception.MemberNotFoundException;
import com.login.login.domain.member.repository.MemberRepository;
import com.login.login.global.security.util.JwtUtil;
import com.login.login.global.token.entity.RefreshToken;
import com.login.login.global.token.repository.RefreshTokenRepository;
import com.fasterxml.jackson.core.JsonProcessingException;
import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.util.LinkedMultiValueMap;
import org.springframework.util.MultiValueMap;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.time.LocalDateTime;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;
    private final MemberRepository memberRepository;
    private final RefreshTokenRepository refreshTokenRepository;
    private final ObjectMapper objectMapper;

    @Value("${kakao.restapi}")
    private String clientId;

    @Value("${kakao.redirect-uri}")
    private String redirectUri;

    @Override
    public MemberLoginResponseDto login(final MemberLoginRequestDto memberLoginRequestDto) {
        // kakao 토큰을 통해 사용자 정보 가져오기
        String[] kakaoInfo = getKakaoUserInfo(memberLoginRequestDto.getKakaoAccessToken());
        log.info("kakao email: {}", kakaoInfo[0]);
        Member member;
        MemberLoginResponseDto memberLoginResponseDto = new MemberLoginResponseDto();
        try {
            // 기존 회원 조회
            member = findMemberByEmail(kakaoInfo[0]);
        } catch (MemberNotFoundException e) {
            // 등록되지 않은 사용자일 경우, 새로운 사용자 생성
            member = Member.builder()
                .regDate(LocalDateTime.now())
                .email(kakaoInfo[0])
                .nickname(kakaoInfo[1])
                .profileImageUrl(kakaoInfo[2])
                .build();
            // 회원 저장
            memberRepository.save(member);
            log.info("성공적으로 회원 추가: {}", kakaoInfo[0]);
        }

        log.info("member: {}", member);

        // AccessToken 및 RefreshToken 생성
        MemberDto memberDto = mapper.map(member, MemberDto.class);
        memberLoginResponseDto.setAccessToken(jwtUtil.createAccessToken(memberDto));
        memberLoginResponseDto.setRefreshToken(jwtUtil.createRefreshToken());

        // RefreshToken 저장
        refreshTokenRepository.save(
            RefreshToken.builder()
                .refreshToken(memberLoginResponseDto.getRefreshToken())
                .email(kakaoInfo[0])
                .build()
        );
        return memberLoginResponseDto;
    }

    @Override
    public String kakaoLogin(String code) throws JsonProcessingException {
        RestTemplate restTemplate = new RestTemplate();

        // HTTP 헤더 설정
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_FORM_URLENCODED);

        // HTTP 바디 설정 (파라미터 설정)
        MultiValueMap<String, String> body = new LinkedMultiValueMap<>();
        body.add("grant_type", "authorization_code");
        body.add("client_id", clientId);
        body.add("redirect_uri", redirectUri);
        body.add("code", code);

        // HTTP 요청 생성
        HttpEntity<MultiValueMap<String, String>> request = new HttpEntity<>(body, headers);

        // 카카오 서버에 POST 요청 보내기
        ResponseEntity<String> response = restTemplate.exchange(
            "https://kauth.kakao.com/oauth/token",
            HttpMethod.POST,
            request,
            String.class
        );
        JsonNode jsonNode = objectMapper.readTree(response.getBody());
        return jsonNode.get("access_token").asText();
    }

    private String[] getKakaoUserInfo(String accessToken) {
        HttpHeaders headers = new HttpHeaders();
        headers.add("Authorization", "Bearer " + accessToken);
        headers.add("Content-Type", "application/x-www-form-urlencoded;charset=utf-8");

        HttpEntity<MultiValueMap<String, String>> kakaoRequest = new HttpEntity<>(headers);
        RestTemplate restTemplate = new RestTemplate();

        try {
            ResponseEntity<String> response = restTemplate.exchange(
                "https://kapi.kakao.com/v2/user/me", HttpMethod.POST, kakaoRequest, String.class);

            String responseBody = response.getBody();
            log.info("Kakao API response: " + responseBody);

            ObjectMapper objectMapper = new ObjectMapper();
            JsonNode kakaoAccountNode = objectMapper.readTree(responseBody).path("kakao_account");

            // 이메일 노드 확인 및 처리
            // 이메일, 프로필 사진 URL, 닉네임 노드 확인 및 처리
            JsonNode emailNode = kakaoAccountNode.path("email");
            JsonNode profileNode = kakaoAccountNode.path("profile");
            JsonNode nicknameNode = profileNode.path("nickname");
            JsonNode profileImageUrlNode = profileNode.path("profile_image_url");

            if (!emailNode.isMissingNode() && !nicknameNode.isMissingNode()
                && !profileImageUrlNode.isMissingNode()) {
                String email = emailNode.asText();
                String nickname = nicknameNode.asText();
                String profileImageUrl = profileImageUrlNode.asText();

                log.info("Kakao user info - email: {}, nickname: {}, profile image URL: {}", email,
                    nickname, profileImageUrl);

                // String 배열로 반환
                return new String[]{email, nickname, profileImageUrl};
            } else {
                log.error("Required user information not found in Kakao account response");
                throw new RuntimeException(
                    "Required user information not found in Kakao account response");
            }
        } catch (HttpClientErrorException e) {
            log.error("Error response from Kakao API: {}", e.getMessage());
            if (e.getStatusCode() == HttpStatus.UNAUTHORIZED) {
                throw new RuntimeException("Kakao access token is invalid or expired.");
            } else {
                throw new RuntimeException("Failed to get Kakao user info", e);
            }
        } catch (JsonProcessingException e) {
            log.error("Failed to parse Kakao response", e);
            throw new RuntimeException("Failed to parse Kakao response", e);
        }
    }

    private Member findMemberByEmail(String email) {
        return memberRepository.findByEmail(email).orElseThrow(MemberNotFoundException::new);
    }
}
