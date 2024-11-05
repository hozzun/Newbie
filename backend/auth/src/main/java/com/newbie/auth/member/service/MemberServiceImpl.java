package com.newbie.auth.member.service;

import com.newbie.auth.global.security.util.JwtUtil;
import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.domain.MemberImage;
import com.newbie.auth.member.dto.MemberDto;
import com.newbie.auth.member.dto.request.MemberSignUpRequestDto;
import com.newbie.auth.member.exception.MemberDuplicateException;
import com.newbie.auth.member.repository.MemberImageRepository;
import com.newbie.auth.member.repository.MemberRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Slf4j
@Service
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService{
    private final MemberRepository memberRepository;
    private final MemberImageRepository memberImageRepository;
    private final JwtUtil jwtUtil;
    private final ModelMapper mapper;

    @Transactional
    public String signUp(MemberSignUpRequestDto signUpMemberDto) {
        Optional<Member> member = memberRepository.findByEmail(signUpMemberDto.getEmail());
        if (member.isPresent()) {
            throw new MemberDuplicateException();
        }

        // 이미지가 있는 경우 S3에 업로드 후 URL 저장
//        if (signUpMemberDto.getFile() != null && !signUpMemberDto.getFile().isEmpty()) {
//            String imageUrl = saveMemberImage(signUpMemberDto.getFile(), savedMember);
//            signUpMemberDto.setMemberImage(imageUrl);
//        }

        log.info("signUpMemberDto: {}", signUpMemberDto);
        Member savedMember = memberRepository.save(Member.signupBuilder()
                .memberSignUpRequestDto(signUpMemberDto)
                .build()
        );

        saveMemberImage(signUpMemberDto, savedMember);

        return jwtUtil.createAccessToken(mapper.map(savedMember, MemberDto.class));
    }

    private void saveMemberImage(MemberSignUpRequestDto signUpMemberDto, Member savedMember) {
        MemberImage memberImage = MemberImage.builder()
                .member(savedMember)
//                .memberImage(signUpMemberDto.getMemberImage().getMemberImage())
                .build();
        memberImageRepository.save(memberImage);
    }
}
