package com.Newbie.Newbie.global.security;

import com.Newbie.Newbie.domain.member.dto.MemberDto;
import com.Newbie.Newbie.domain.member.entity.Member;
import com.Newbie.Newbie.domain.member.repository.MemberRepository;
import com.Newbie.Newbie.global.token.entity.RefreshToken;
import com.Newbie.Newbie.global.token.repository.RefreshTokenRepository;
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

