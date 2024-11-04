package com.newbie.cardstore.card.service;

import com.newbie.cardstore.card.dto.PlayerCardDto;
import com.newbie.cardstore.card.entity.PlayerCard;
import com.newbie.cardstore.card.repository.PlayerCardRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class CardService {

    private final PlayerCardRepository playerCardRepository;


    /**
     * 카드 목록 조회
     * @param team 팀 type을 가져와서 해당 팀 별 카드를 조회합니다.
     * @return List<PlayerCardDto>
     */
    public List<PlayerCardDto> getTeamCards(String team) {
        List<PlayerCard> cards = playerCardRepository.findByTeam(team);
        return cards.stream()
               .map(this::convertToDTO)
               .collect(Collectors.toList());
    }

    public List<PlayerCardDto> getLatestCards(String team) {
        List<PlayerCard> cards = playerCardRepository.findByTeamOrderByCreatedAtDesc(team);
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public List<PlayerCardDto> getTopSalesCards(String team) {
        List<PlayerCard> cards = playerCardRepository.findByTeamOrderBySalesCountDesc(team);
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    private PlayerCardDto convertToDTO(PlayerCard playerCard) {
        return PlayerCardDto.builder()
                .id(playerCard.getId())
                .name(playerCard.getName())
                .no(playerCard.getNo())
                .team(playerCard.getTeam())
                .price(playerCard.getPrice())
                .imageUrl(playerCard.getImageUrl())
                .position(playerCard.getPosition())
                .createdAt(playerCard.getCreatedAt())
                .build();
    }

}
