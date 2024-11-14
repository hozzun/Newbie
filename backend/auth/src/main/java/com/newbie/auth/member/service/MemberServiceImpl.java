package com.newbie.auth.member.service;

import com.newbie.auth.global.security.util.JwtUtil;
import com.newbie.auth.member.domain.ExceptionMessages;
import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.dto.MemberDto;
import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;
import com.newbie.auth.member.dto.request.UserProfileRequestDto;
import com.newbie.auth.member.exception.MemberDuplicateException;
import com.newbie.auth.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{

    private final MemberRepository memberRepository;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;
    private final RestTemplate restTemplate;

    @Value("${register.api}")
    private String registerApi;

    @Override
    @Transactional
    public String signUp(MemberSignUpRequestDto signUpMemberDto) {
        Optional<Member> member = memberRepository.findByEmail(signUpMemberDto.getEmail());
        if (member.isPresent()) {
            throw new MemberDuplicateException();
        }

        Member savedMember = memberRepository.save(Member.signupBuilder()
                .memberSignUpRequestDto(signUpMemberDto)
                .build()
        );

        UserProfileRequestDto userProfileRequest = new UserProfileRequestDto(
                savedMember.getMemberId(),
                signUpMemberDto.getEmail(),
                signUpMemberDto.getNickname(),
                signUpMemberDto.getAddress()
        );
        restTemplate.postForObject(registerApi, userProfileRequest, Void.class);

        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    @Override
    @Transactional
    public void resignMember(Long memberId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException(ExceptionMessages.NOT_FOUND.getMessage()));
        member.resign();
    }
}
