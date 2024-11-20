package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.LikePlayerResponseDto;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.entity.PlayerLike;
import com.newbie.baseball.domain.player.exception.LikeNotFoundException;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.player.repository.PlayerLikeRepository;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class PlayerLikeServiceImpl implements PlayerLikeService {

    private final PlayerRepository playerRepository;
    private final PlayerLikeRepository playerLikeRepository;

    @Override
    @Transactional
    public void toggleLike(Long memberId, Integer playerId) {
        Player player = playerRepository.findById(playerId)
                .orElseThrow(PlayerNotFoundException::new);

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

    @Override
    public LikePlayerResponseDto getLikedPlayer(Long memberId, Integer playerId) {
        Optional<PlayerLike> likeOpt = playerLikeRepository.findByMemberIdAndPlayerId(memberId, playerId);
        return likeOpt.map(this::convertToDto)
                .orElse(LikePlayerResponseDto.builder()
                        .playerId(playerId)
                        .isLiked(false)
                        .build());
    }

    @Override
    public List<LikePlayerResponseDto> getLikedPlayersByMember(Long memberId) {
        List<PlayerLike> likes = playerLikeRepository.findByMemberId(memberId);
        if (likes.isEmpty()) {
            throw new LikeNotFoundException();
        }
        return likes.stream()
                .filter(PlayerLike::getIsLiked)
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }
    private LikePlayerResponseDto convertToDto(PlayerLike playerLike) {
        return LikePlayerResponseDto.builder()
                .playerId(playerLike.getPlayerId())
                .isLiked(playerLike.getIsLiked())
                .build();
    }
}