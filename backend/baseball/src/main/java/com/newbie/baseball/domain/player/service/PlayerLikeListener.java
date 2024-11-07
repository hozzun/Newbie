package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.req.PlayerLikeRequestDto;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerLikeListener {

    private final PlayerRepository playerRepository;

    @RabbitListener(queues = "${rabbitmq.queue.checkPlayerQueue}")
    public Boolean checkPlayerExists(Integer playerId) {
        return playerRepository.existsById(playerId);
    }

    @RabbitListener(queues = "${rabbitmq.queue.likePlayerQueue}")
    @Transactional
    public void handleLikeEvent(PlayerLikeRequestDto eventDto) {
        Optional<Player> playerOpt = playerRepository.findById(eventDto.getPlayerId());

        if (playerOpt.isEmpty()) {
            log.warn("Player with ID {} not found. Ignoring the like event.", eventDto.getPlayerId());
            return;
        }

        Player player = playerOpt.get();
        Long memberId = eventDto.getMemberId();

        // 좋아요 상태에 따라 좋아요 수를 토글
        if (player.getLikers().contains(memberId)) {
            player.getLikers().remove(memberId);
            player.decrementLikeCount();
        } else {
            player.getLikers().add(memberId);
            player.incrementLikeCount();
        }

        playerRepository.save(player);

        log.info("Updated like count for player ID {}: {}", player.getId(), player.getLikeCount());
    }
}
