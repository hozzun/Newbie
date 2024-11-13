package com.newbie.chat.domain.chatroom.controller;

import com.newbie.chat.domain.chatroom.service.ReportService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/report")
@RequiredArgsConstructor
public class ReportController {

    private final ReportService reportService;

    @PostMapping
    public ResponseEntity<String> reportUser(@RequestParam String reporterUserId, @RequestParam String reportedUserId) {
        if (reporterUserId.equals(reportedUserId)) {
            return ResponseEntity.badRequest().body("자기 자신을 신고할 수 없습니다.");
        }

        boolean success = reportService.incrementReportCount(reporterUserId, reportedUserId);
        if (success) {
            return ResponseEntity.ok("신고가 접수되었습니다.");
        } else {
            return ResponseEntity.badRequest().body("이미 신고한 사용자입니다.");
        }
    }
}
