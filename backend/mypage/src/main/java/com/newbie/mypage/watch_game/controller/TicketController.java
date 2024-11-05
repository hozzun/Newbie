package com.newbie.mypage.watch_game.controller;

import com.newbie.mypage.watch_game.dto.TicketResponseDto;
import com.newbie.mypage.watch_game.dto.TicketTextDto;
import com.newbie.mypage.watch_game.service.OcrService;
import com.newbie.mypage.watch_game.service.TicketService;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.List;
import java.util.Map;

@RestController
@RequiredArgsConstructor
@RequestMapping("/ticket")
@Tag(name = "Ticket API", description = "티켓 API")
public class TicketController {

    private final OcrService ocrService;
    private final TicketService ticketService;


    /**
     * OCR API
     * @param image
     * @param userId
     * @return 경기 날짜, 경기 팀1, 경기 팀2
     */
    @PostMapping(value = "/naverOcr", consumes = "multipart/form-data")
    public ResponseEntity<?> ocr(@RequestParam("image") MultipartFile image, @RequestParam int userId) {
        try {
            Map<String, Object> result = ocrService.processAndSaveTicket(image, userId);
            return ResponseEntity.ok(result);
        } catch (IllegalArgumentException e) {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(Map.of("error", e.getMessage()));
        } catch (IOException | java.text.ParseException | ParseException e) {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body(Map.of("error", "서버 오류가 발생했습니다."));
        }
    }


    /**
     * 나의 직관 경기 확인하기
     * @param userId
     * @return 유저의 직관 경기 리스트
     */
    @GetMapping("/list")
    public ResponseEntity<List<TicketResponseDto>> getTicketList(@RequestParam int userId) {
        List<TicketResponseDto> result = ticketService.getTicketList(userId);
        if (result.isEmpty()) {
            return ResponseEntity.noContent().build();
        }
        return ResponseEntity.ok(result);
    }

    /**
     * 직관 경기 단일 조회
     * @param id
     * @return
     */
    @GetMapping()
    public ResponseEntity<TicketResponseDto> getTicket(@RequestParam String id) {
        TicketResponseDto result = ticketService.getTicket(id);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTicket(@RequestParam String id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

    @PutMapping("/text")
    public ResponseEntity<Void> updateText(@RequestBody TicketTextDto textDto) {
        ticketService.updateText(textDto.getId(), textDto.getText());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
