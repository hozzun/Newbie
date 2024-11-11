package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class PlayerServiceImpl implements PlayerService {

    private final PlayerRepository playerRepository;

    @Override
    public PlayerResponseDto getPlayerById(Integer id) {
        Player player = playerRepository.findById(id)
                .orElseThrow(PlayerNotFoundException::new);
                return convertToDto(player);
    }

    @Override
    public Page<PlayerResponseDto> getPlayersByTeam(Integer teamId, String position, String sortBy, Pageable pageable) {
        Page<Player> players;

        if (position != null && !position.isEmpty()) {
            // 포지션별 조회
            if ("likeCount".equalsIgnoreCase(sortBy)) {
                players = playerRepository.findByTeamIdAndPositionOrderByLikeCountDesc(teamId, position, pageable);
            } else {
                players = playerRepository.findByTeamIdAndPosition(teamId, position, pageable); // 기본 id 순
            }
        } else {
            // 포지션 필터 없이 전체 팀 조회
            if ("likeCount".equalsIgnoreCase(sortBy)) {
                players = playerRepository.findByTeamIdOrderByLikeCountDesc(teamId, pageable);
            } else if ("backNumber".equalsIgnoreCase(sortBy)) {
                players = playerRepository.findByTeamIdOrderByBackNumberDesc(teamId, pageable);
            } else {
                players = playerRepository.findByTeamId(teamId, pageable); // 기본 id 순
            }
        }
        return players.map(this::convertToDto);
    }

    @Override
    public PlayerResponseDto getPlayerByTeamIdAndBackNumber(Integer teamId, String backNumber) {
        Player player = playerRepository.findByTeamIdAndBackNumber(teamId, backNumber)
                .orElseThrow(PlayerNotFoundException::new);
        return convertToDto(player);
    }

    private PlayerResponseDto convertToDto(Player player) {
        return PlayerResponseDto.builder()
                .id(player.getId())
                .backNumber(player.getBackNumber())
                .name(player.getName())
                .teamId(player.getTeam().getId())
                .teamName(player.getTeam().getTeamName())
                .position(player.getPosition())
                .birth(player.getBirth())
                .physical(player.getPhysical())
                .academic(player.getAcademic())
                .likeCount(player.getLikeCount())
                .build();
    }
}