package com.newbie.cardstore.card.controller;

import com.newbie.cardstore.card.dto.PlayerCardDto;
import com.newbie.cardstore.card.service.CardService;
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


@RestController
@RequestMapping("/cards")
@RequiredArgsConstructor
@Tag(name = "Card API", description = "카드 API")
public class CardController {

    private final CardService cardService;

    @Operation(summary = "기본 카드 조회", description = "구단별 카드를 조회합니다.")
    @GetMapping("/team")
    public ResponseEntity<List<PlayerCardDto>> getTeamCards(@RequestParam @Parameter(description = "구단 이름") String team) {
        List<PlayerCardDto> cards = cardService.getTeamCards(team);
        return ResponseEntity.ok(cards);
    }

    @Operation(summary = "최근순 카드 조회", description = "최근순 카드를 조회합니다.")
    @GetMapping("/latest")
    public ResponseEntity<List<PlayerCardDto>> getLatestCards(@RequestParam String team) {
        List<PlayerCardDto> cards = cardService.getLatestCards(team);
        return ResponseEntity.ok(cards);
    }


    @Operation(summary = "판매순 카드 조회", description = "판매순 카드를 조회합니다.")
    @GetMapping("/top-sales")
    public ResponseEntity<List<PlayerCardDto>> getTopSalesCards(@RequestParam String team) {
        List<PlayerCardDto> cards = cardService.getTopSalesCards(team);
        return ResponseEntity.ok(cards);
    }
}
