package com.newbie.cardstore.storecard.controller;

import com.newbie.cardstore.storecard.dto.PlayerCardDto;
import com.newbie.cardstore.storecard.entity.SortType;
import com.newbie.cardstore.storecard.service.CardService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;
import java.util.Optional;


@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Tag(name = "Card API", description = "카드 API")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "카드 조회", description = "구단별 카드를 조회합니다.")
    @GetMapping("/team")
    public ResponseEntity<List<PlayerCardDto>> getCards(
            @RequestParam @Parameter(description = "구단 이름") int team,
            @RequestParam @Parameter(description = "포지션") String position,
            @RequestParam(defaultValue = "DEFAULT") @Parameter(description = "정렬 타입") SortType sortType,
            @RequestParam @Parameter(description = "구매된 카드 포함 여부") boolean includeCard,
            @RequestParam Long userId) {
        List<PlayerCardDto> cards = cardService.getCards(team, sortType, position, includeCard, userId);
        return ResponseEntity.ok(cards);
    }

    @Operation(summary = "카드 확인", description = "카드를 조회합니다")
    @GetMapping("/player")
    public ResponseEntity<Optional<PlayerCardDto>> getPlayerDetails(
            @RequestParam @Parameter(description = "카드 ID") String cardId) {

        Optional<PlayerCardDto> playerCard = cardService.getPlayerDetailsWithCardInfo(cardId);
        return ResponseEntity.ok(playerCard);
    }

    @Operation(summary = "내 최신 카드 조회", description = "사용자가 가지고 있는 카드 중 최근 카드 하나를 조회합니다.")
    @GetMapping("/mycard")
    public ResponseEntity<PlayerCardDto> getMyLatestCard(@RequestParam Long userId) {
        PlayerCardDto myLatestCard = cardService.getMyLatestCard(userId);
        return ResponseEntity.ok(myLatestCard);
    }

    @Operation(summary = "판매순 카드 조회", description = "구단별 카드 판매 TOP3를 조회합니다.")
    @GetMapping("/top-sales")
    public ResponseEntity<List<PlayerCardDto>> getTopSalesCards() {
        List<PlayerCardDto> topSalesCards = cardService.getTopSalesCards();
        return ResponseEntity.ok(topSalesCards);
    }

    @Operation(summary = "카드 확인", description = "사용자가 구매한 카드 목록을 조회합니다.")
    @GetMapping("/users")
    public ResponseEntity<List<PlayerCardDto>> getCardsByUserId(@RequestParam Long userId) {
        List<PlayerCardDto> cardsByUserId = cardService.getCardsByUserId(userId);
        return ResponseEntity.ok(cardsByUserId);
    }
}
