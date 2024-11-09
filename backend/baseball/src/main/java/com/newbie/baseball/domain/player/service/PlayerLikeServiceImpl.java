package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.entity.PlayerLike;
import com.newbie.baseball.domain.player.repository.PlayerLikeRepository;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerLikeServiceImpl implements PlayerLikeService {

    private final PlayerRepository playerRepository;
    private final PlayerLikeRepository playerLikeRepository;

    @Transactional
    public void toggleLike(Long memberId, Integer playerId) {
        Optional<Player> playerOpt = playerRepository.findById(playerId);

        if (playerOpt.isEmpty()) {
            throw new IllegalArgumentException("유효하지 않은 선수 ID입니다.");
        }

        Player player = playerOpt.get();

        Optional<PlayerLike> likeRecordOpt = playerLikeRepository.findByMemberIdAndPlayerId(memberId, playerId);

        if (likeRecordOpt.isPresent()) {
            // 기존 좋아요 기록이 있으면 상태를 토글
            PlayerLike likeRecord = likeRecordOpt.get();
            likeRecord.toggleLike();
            if (likeRecord.getIsLiked()) {
                player.incrementLikeCount();
            } else {
                player.decrementLikeCount();
            }
        } else {
            // 새로운 좋아요 기록을 추가
            PlayerLike newLikeRecord = new PlayerLike(memberId, playerId);
            playerLikeRepository.save(newLikeRecord);
            player.incrementLikeCount();
        }

        playerRepository.save(player);
        log.info("Updated like count for player ID {}: {}", player.getId(), player.getLikeCount());
    }
}