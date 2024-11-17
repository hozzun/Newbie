package com.newbie.board.config;

import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.generalBoard.service.GeneralBoardService;
import com.newbie.board.usedBoard.service.UsedBoardService;
import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

@RequiredArgsConstructor
@Service
public class UserEventConsumer {

    private final GeneralBoardService generalBoardService;
    private final UsedBoardService usedBoardService;

    @RabbitListener(queues = "${rabbitmq.auth.queue.name}")
    public void handleUserDeletedEvent(Long userId) {
        generalBoardService.markPostsAsDeletedByUserId(userId);
        usedBoardService.markPostsAsDeletedByUserId(userId);
    }
}
