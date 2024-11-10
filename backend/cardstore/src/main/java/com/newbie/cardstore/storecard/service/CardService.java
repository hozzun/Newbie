package com.newbie.cardstore.storecard.service;

import com.newbie.cardstore.storecard.dto.PlayerCardDto;
import com.newbie.cardstore.storecard.dto.PlayerDetailDto;
import com.newbie.cardstore.storecard.dto.PlayerRequest;
import com.newbie.cardstore.storecard.entity.PlayerCard;
import com.newbie.cardstore.storecard.entity.SortType;
import com.newbie.cardstore.storecard.repository.PlayerCardRepository;
import com.newbie.cardstore.usercard.entity.UserCard;
import com.newbie.cardstore.usercard.repository.UserCardRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.bson.types.ObjectId;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import java.time.format.DateTimeFormatter;
import java.time.LocalDate;
import java.util.Comparator;
import java.util.List;
import java.util.Optional;
import java.util.Set;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class CardService {

    private final PlayerCardRepository playerCardRepository;
    private final UserCardRepository userCardRepository;
    private final RabbitTemplate rabbitTemplate;
    private static final DateTimeFormatter dateFormatter = DateTimeFormatter.ofPattern("yyyy-MM-dd");

    @Value("${rabbitmq.exchange.name}")
    private String exchangeName;

    @Value("${rabbitmq.routing.key.player}")
    private String playerRoutingKey;

    public PlayerDetailDto getPlayerDetailsWithCardInfo(String id, int team, String no) {
        // 요청할 메시지 생성
        PlayerRequest playerRequest = new PlayerRequest(team, no);

        // RabbitMQ로 선수 서버에 요청 보내기
        PlayerDetailDto playerDetail = (PlayerDetailDto) rabbitTemplate.convertSendAndReceive(
                exchangeName,
                playerRoutingKey,
                playerRequest
        );

        if (playerDetail == null) {
            log.warn("Player detail not found for team: {}, no: {}", team, no);
            throw new RuntimeException("Player detail not found.");
        }

        // 카드 정보 조회 및 빌더 패턴으로 PlayerDetailDto 구성
        return playerCardRepository.findById(id)
                .map(card -> PlayerDetailDto.builder()
                        .id(card.getId())
                        .name(card.getName())
                        .no(card.getNo())
                        .team(card.getTeam())
                        .price(card.getPrice())
                        .imageUrl(card.getImageUrl())
                        .position(card.getPosition())
                        .createdAt(card.getCreatedAt())
                        .birthday(playerDetail.getBirthday())
                        .physical(playerDetail.getPhysical())
                        .career(playerDetail.getCareer())
                        .build())
                .orElseThrow(() -> new RuntimeException("Card not found"));
    }

    /**
     * 카드 목록 조회
     * @param teamId, sortType, includeCard, userId
     * @return List<PlayerCardDto>
     */
    public List<PlayerCardDto> getCards(int teamId, SortType sortType, boolean includeCard, int userId) {
        List<PlayerCard> cards;

        // 정렬 타입에 따라 카드를 조회
        switch (sortType) {
            case LATEST:
                cards = playerCardRepository.findByTeamOrderByCreatedAtDesc(teamId);
                break;
            case SALES:
                cards = playerCardRepository.findByTeamOrderBySalesCountDesc(teamId);
                break;
            default:
                cards = playerCardRepository.findByTeam(teamId);
                cards.sort((c1, c2) -> c1.getName().compareTo(c2.getName()));
                break;
        }

        // includeCard가 false일 때, 해당 유저가 이미 보유한 카드를 필터링
        if (!includeCard) {
            List<ObjectId> userCardIds = userCardRepository.findCardIdsByUserId(userId);
            cards = cards.stream()
                    .filter(card -> !userCardIds.contains(card.getId()))  // 유저가 보유하지 않은 카드만 필터링
                    .collect(Collectors.toList());
        }

        // DTO로 변환하여 반환
        return cards.stream()
                .map(this::convertToDTO)
                .collect(Collectors.toList());
    }

    public PlayerCardDto getMyLatestCard(int userId) {
        Optional<UserCard> userCardOpt = userCardRepository.findByUserId(userId);

        Set<ObjectId> cardIds = userCardOpt.get().getCardIds();
        PlayerCard latestPlayerCard = playerCardRepository.findTop1ByIdInOrderByCreatedAtDesc(cardIds);

        return latestPlayerCard == null? null : convertToDTO(latestPlayerCard);
    }

    public List<PlayerCardDto> getTopSalesCards() {
        List<PlayerCard> cards = playerCardRepository.findTop3ByOrderBySalesCountDesc();
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
