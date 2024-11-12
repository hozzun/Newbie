package com.newbie.chat.domain.chatroom.controller;

import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import com.newbie.chat.domain.chatroom.service.ChatService;
import com.newbie.chat.domain.chatroom.service.RateLimitingService;
import com.newbie.chat.domain.chatroom.service.ReportService;
import com.newbie.chat.global.filter.ProfanityFilter;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.messaging.handler.annotation.*;
import org.springframework.messaging.simp.*;
import org.springframework.web.bind.annotation.RestController;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;

@Slf4j
@RequiredArgsConstructor
@RestController
public class ChatController {

    private final ChatService chatService;
    private final RateLimitingService rateLimitingService;
    private final ReportService reportService;
    private final SimpMessagingTemplate messagingTemplate;
    private final ProfanityFilter profanityFilter;

    @MessageMapping("/chat/{roomId}/sendMessage")
    public void sendMessage(@DestinationVariable String roomId, ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
        message.setRoomId(roomId);
        message.setTimestamp(LocalDateTime.now());

        String sender = message.getSender();

        // 사용자 차단 여부 확인
        if (reportService.isUserBanned(sender) || rateLimitingService.isBlocked(sender)) {
            log.warn("Blocked user {} attempted to send a message.", sender);

            if (reportService.isUserBanned(sender)) {
                // 차단 만료 시간 조회
                LocalDateTime banExpiry = reportService.getBanExpiry(sender);

                // 차단 알림 메시지 생성
                ChatMessage banMessage = ChatMessage.builder()
                        .type(ChatMessage.MessageType.SYSTEM)
                        .sender("System")
                        .roomId(roomId)
                        .message("신고로 인해 3일 동안 채팅을 할 수 없습니다. 차단 만료 시간: " + banExpiry.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                        .timestamp(LocalDateTime.now())
                        .build();

                // 사용자에게 차단 메시지 전송 (개인 메시지)
                messagingTemplate.convertAndSend("/queue/private/" + sender, banMessage);

                return; // 메시지 전송을 중단
            }
        }

        // 도배 방지 확인
        if (!rateLimitingService.isAllowed(sender)) {
            log.warn("User {} is sending messages too frequently.", sender);
            return;
        }

        // 메시지 내용 로그 출력
        log.info("Original message: {}", message.getMessage());

        // 욕설 필터링
        if (profanityFilter.containsProfanity(message.getMessage())) {
            message.setMessage("부적절한 표현을 감지한 채팅입니다.");
            log.info("Message after filtering: {}", message.getMessage());
        }

        chatService.saveMessage(roomId, message);
    }

    @MessageMapping("/chat/{roomId}/join")
    public void joinRoom(@DestinationVariable String roomId, ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
        String sender = message.getSender();

        // 사용자 차단 여부 확인
        if (reportService.isUserBanned(sender)) {
            log.warn("Banned user {} attempted to join the chat room.", sender);

            // 차단 만료 시간 조회
            LocalDateTime banExpiry = reportService.getBanExpiry(sender);

            // 차단 알림 메시지 생성
            ChatMessage banMessage = ChatMessage.builder()
                    .type(ChatMessage.MessageType.SYSTEM)
                    .sender("System")
                    .roomId(roomId)
                    .message("신고로 인해 3일 동안 모든 채팅방에 입장할 수 없습니다. 차단 만료 시간: " +
                            banExpiry.format(DateTimeFormatter.ofPattern("yyyy-MM-dd HH:mm:ss")))
                    .timestamp(LocalDateTime.now())
                    .build();

            // 사용자에게 차단 메시지 전송 (개인 메시지)
            messagingTemplate.convertAndSend("/queue/private/" + sender, banMessage);

            return; // 입장 거부
        }

        // 사용자 참여자 목록에 추가
        chatService.addParticipant(roomId, sender);

        // 세션에 사용자 정보 저장
        headerAccessor.getSessionAttributes().put("username", sender);
        headerAccessor.getSessionAttributes().put("roomId", roomId);

        // 'JOIN' 메시지 생성
        ChatMessage joinMessage = ChatMessage.builder()
                .type(ChatMessage.MessageType.JOIN)
                .sender(sender)
                .roomId(roomId)
                .message(sender + "님이 입장하였습니다.")
                .timestamp(LocalDateTime.now())
                .build();

        // 'JOIN' 메시지를 채팅방에 전송
        messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, joinMessage);

        // 참여자 수 전송
        int participantCount = chatService.getParticipantCount(roomId);
        messagingTemplate.convertAndSend("/topic/chatroom/" + roomId + "/participants", participantCount);
    }

//    @MessageMapping("/chat/{roomId}/leave")
//    public void leaveRoom(@DestinationVariable String roomId, ChatMessage message, SimpMessageHeaderAccessor headerAccessor) {
//        message.setRoomId(roomId);
//        message.setType(ChatMessage.MessageType.LEAVE);
//        message.setMessage(message.getSender() + "님이 퇴장하셨습니다.");
//        message.setTimestamp(LocalDateTime.now());
//
//        chatService.saveMessage(roomId, message);
//
//        // 참여자 목록에서 사용자 제거
//        chatService.removeParticipant(roomId, message.getSender());
//
//        // 세션에서 사용자 정보 제거
//        headerAccessor.getSessionAttributes().remove("username");
//        headerAccessor.getSessionAttributes().remove("roomId");
//
//        // 참여자 수 전송
//        int participantCount = chatService.getParticipantCount(roomId);
//        messagingTemplate.convertAndSend("/topic/chatroom/" + roomId + "/participants", participantCount);
//    }
}
