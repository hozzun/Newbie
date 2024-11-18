package com.newbie.mypage.watch_game.controller;

import com.newbie.mypage.watch_game.dto.TicketResponseDto;
import com.newbie.mypage.watch_game.dto.TicketTextDto;
import com.newbie.mypage.watch_game.service.OcrService;
import com.newbie.mypage.watch_game.service.TicketService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.json.simple.parser.ParseException;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
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
    @Operation(summary = "티켓 OCR 분석", description = "사용자가 티켓 이미지 등록 시 OCR 분석을 실시합니다.")
    @PostMapping(value = "/naverOcr", consumes = MediaType.MULTIPART_FORM_DATA_VALUE)
    public ResponseEntity<?> ocr(@RequestParam("image") MultipartFile image, @RequestHeader("X-Member-ID") String userId) {
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
    @Operation(summary = "직관 경기 리스트 확인", description = "사용자가 직관간 경기의 리스트를 확인합니다.")
    @GetMapping("/list")
    public ResponseEntity<List<TicketResponseDto>> getTicketList(@RequestHeader("X-Member-ID") String userId) {
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
    @Operation(summary = "직관 경기 확인", description = "사용자가 직관간 경기를 확인합니다.")
    @GetMapping()
    public ResponseEntity<TicketResponseDto> getTicket(@RequestParam @Parameter(description = "티켓 ID") String id) {
        TicketResponseDto result = ticketService.getTicket(id);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "최근 직관 경기 확인", description = "사용자의 최근 직관 경기를 확인합니다.")
    @GetMapping("/latest")
    public ResponseEntity<TicketResponseDto> getLatestTicket(@RequestHeader("X-Member-ID") String userId) {
        TicketResponseDto result = ticketService.getLatestTicket(userId);
        if (result == null) {
            return ResponseEntity.notFound().build();
        }
        return ResponseEntity.ok(result);
    }

    @Operation(summary = "직관 경기 삭제", description = "사용자가 직관간 경기를 삭제합니다.")
    @DeleteMapping("/delete")
    public ResponseEntity<?> deleteTicket(@RequestParam @Parameter(description = "티켓 ID") String id) {
        ticketService.deleteTicket(id);
        return ResponseEntity.noContent().build();
    }

    @Operation(summary = "직관 경기 text 추가", description = "사용자가 직관 경기에 text를 추가합니다.")
    @PutMapping("/text")
    public ResponseEntity<Void> updateText(@RequestBody @Parameter(description = "티켓 ID와 Text") TicketTextDto textDto) {
        ticketService.updateText(textDto.getId(), textDto.getText());
        return ResponseEntity.status(HttpStatus.OK).build();
    }
}
