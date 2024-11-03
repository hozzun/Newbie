package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
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
                .build();
    }
}