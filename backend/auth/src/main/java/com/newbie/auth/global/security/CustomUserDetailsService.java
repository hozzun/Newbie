package com.newbie.auth.global.security;

import com.newbie.auth.member.dto.MemberDto;
import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.repository.MemberRepository;
import com.newbie.auth.global.token.entity.RefreshToken;
import com.newbie.auth.global.token.repository.RefreshTokenRepository;
import lombok.RequiredArgsConstructor;
import org.modelmapper.ModelMapper;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.core.userdetails.UserDetailsService;
import org.springframework.security.core.userdetails.UsernameNotFoundException;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class CustomUserDetailsService implements UserDetailsService {

    private final RefreshTokenRepository refreshTokenRepository;
    private final MemberRepository memberRepository;
    private final ModelMapper mapper;

    @Override
    public UserDetails loadUserByUsername(String email) throws UsernameNotFoundException {
        Member member = memberRepository.findByEmail(email)
            .orElseThrow(() -> new UsernameNotFoundException("해당하는 유저 존재하지 않음"));

        MemberDto memberDto = mapper.map(member, MemberDto.class);
        return new CustomUserDetails(memberDto);
    }

    public boolean checkRefreshTokenEmail(String email) {
        Optional<RefreshToken> refreshToken = refreshTokenRepository.findByEmail(email);
        return refreshToken.isPresent();
    }
}

