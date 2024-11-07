package com.newbie.auth.member.service;

import com.newbie.auth.member.domain.Member;
import com.newbie.auth.member.domain.MemberPlayerLike;
import com.newbie.auth.member.dto.event.PlayerLikeEventDto;
import com.newbie.auth.member.repository.MemberPlayerLikeRepository;
import com.newbie.auth.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.util.Optional;
import java.util.concurrent.CompletableFuture;
import java.util.concurrent.TimeUnit;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerLikeServiceImpl implements PlayerLikeService {

    private final MemberPlayerLikeRepository likeRepository;
    private final MemberRepository memberRepository;
    private final RabbitTemplate rabbitTemplate;

    @Value("${rabbitmq.queue.likePlayerQueue}")
    private String likePlayerQueue;

    @Value("${rabbitmq.queue.checkPlayerQueue}")
    private String checkPlayerQueue;

    @Override
    public void toggleLike(Long memberId, Integer playerId) {
        Member member = memberRepository.findById(memberId)
                .orElseThrow(() -> new IllegalArgumentException("유효하지 않은 사용자 ID입니다."));

        // 비동기로 baseball 서버에 player 존재 여부 확인
        CompletableFuture<Boolean> playerExistsFuture = CompletableFuture.supplyAsync(() -> {
            try {
                return (Boolean) rabbitTemplate.convertSendAndReceive(checkPlayerQueue, playerId);
            } catch (Exception e) {
                log.error("Error occurred while sending player existence check request to RabbitMQ", e);
                return false;
            }
        });

        Boolean playerExists;
        try {
            playerExists = playerExistsFuture.get(5, TimeUnit.SECONDS); // 최대 5초 대기
        } catch (Exception e) {
            log.error("Timeout or interruption occurred while checking player existence", e);
            throw new RuntimeException("선수 존재 여부 확인 중 오류 발생", e);
        }

        if (Boolean.FALSE.equals(playerExists)) {
            throw new IllegalArgumentException("유효하지 않은 선수 ID입니다.");
        }

        // 좋아요 상태 토글
        Optional<MemberPlayerLike> existingLike = likeRepository.findByMemberAndPlayerId(member, playerId);
        boolean isLiked = existingLike.isPresent();
        PlayerLikeEventDto eventDto = new PlayerLikeEventDto(memberId, playerId);

        if (isLiked) {
            likeRepository.delete(existingLike.get());
        } else {
            likeRepository.save(new MemberPlayerLike(member, playerId));
        }

        // 좋아요 이벤트 발행
        rabbitTemplate.convertAndSend(likePlayerQueue, eventDto);
    }
}
