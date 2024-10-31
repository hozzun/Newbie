package com.newbie.cardstore.card.controller;

import com.newbie.cardstore.card.dto.PlayerCardDto;
import com.newbie.cardstore.card.service.CardService;
import lombok.AccessLevel;
import lombok.NoArgsConstructor;
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
public class CardController {

    private final CardService cardService;

    @GetMapping("/team")
    public ResponseEntity<List<PlayerCardDto>> getTeamCards(@RequestParam String team) {
        List<PlayerCardDto> cards = cardService.getTeamCards(team);
        return ResponseEntity.ok(cards);
    }

    @GetMapping("/latest")
    public ResponseEntity<List<PlayerCardDto>> getLatestCards(@RequestParam String team) {
        List<PlayerCardDto> cards = cardService.getLatestCards(team);
        return ResponseEntity.ok(cards);
    }

    // 판매순 카드 목록 반환
    @GetMapping("/top-sales")
    public ResponseEntity<List<PlayerCardDto>> getTopSalesCards(@RequestParam String team) {
        List<PlayerCardDto> cards = cardService.getTopSalesCards(team);
        return ResponseEntity.ok(cards);
    }
}
