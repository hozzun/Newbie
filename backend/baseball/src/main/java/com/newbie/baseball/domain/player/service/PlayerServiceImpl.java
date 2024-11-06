package com.newbie.baseball.domain.player.service;

import com.newbie.baseball.domain.game.dto.res.GameResponseDto;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.player.dto.res.PlayerResponseDto;
import com.newbie.baseball.domain.player.entity.Player;
import com.newbie.baseball.domain.player.exception.PlayerNotFoundException;
import com.newbie.baseball.domain.player.repository.PlayerRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

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
    public List<PlayerResponseDto> getPlayersByTeamId(Integer teamId) {
        List<Player> players = playerRepository.findByTeamId(teamId);
        if (players.isEmpty()) {
            throw new PlayerNotFoundException();
        }
        return players.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public List<PlayerResponseDto> getPlayersByTeamIdAndPosition(Integer teamId, String position) {
        List<Player> players = playerRepository.findByTeamIdAndPosition(teamId, position);
        if (players.isEmpty()) {
            throw new PlayerNotFoundException();
        }
        return players.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    @Override
    public PlayerResponseDto getPlayerByTeamIdAndBackNumberAndPlayerName(Integer teamId, String backNumber, String playerName) {
        Player player = playerRepository.findByTeamIdAndBackNumberAndName(teamId, backNumber, playerName)
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