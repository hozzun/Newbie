package com.newbie.chat.global.listener;

import com.newbie.chat.domain.chatroom.dto.ChatMessage;
import com.newbie.chat.domain.chatroom.service.ChatService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.context.event.EventListener;
import org.springframework.messaging.simp.SimpMessagingTemplate;
import org.springframework.messaging.simp.stomp.StompHeaderAccessor;
import org.springframework.stereotype.Controller;
import org.springframework.web.socket.messaging.SessionDisconnectEvent;

import java.time.LocalDateTime;

@Slf4j
@RequiredArgsConstructor
@Controller
public class WebSocketEventListener {

    private final ChatService chatService;
    private final SimpMessagingTemplate messagingTemplate;

    @EventListener
    public void handleWebSocketDisconnectListener(SessionDisconnectEvent event) {
        StompHeaderAccessor headerAccessor = StompHeaderAccessor.wrap(event.getMessage());
        String userName = (String) headerAccessor.getSessionAttributes().get("username");
        String roomId = (String) headerAccessor.getSessionAttributes().get("roomId");

        if (userName != null && roomId != null) {
            // 참여자 목록에서 사용자 제거
            chatService.removeParticipant(roomId, userName);

            // 퇴장 메시지 생성
            ChatMessage leaveMessage = ChatMessage.builder()
                    .type(ChatMessage.MessageType.LEAVE)
                    .sender(userName)
                    .roomId(roomId)
                    .timestamp(LocalDateTime.now())
                    .build();

            // 채팅방에 퇴장 메시지 전송
            messagingTemplate.convertAndSend("/topic/chatroom/" + roomId, leaveMessage);

            // 참여자 수 전송
            int participantCount = chatService.getParticipantCount(roomId);
            messagingTemplate.convertAndSend("/topic/chatroom/" + roomId + "/participants", participantCount);
        }
    }
}
