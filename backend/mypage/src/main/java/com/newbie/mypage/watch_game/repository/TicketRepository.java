package com.newbie.mypage.watch_game.repository;


import com.newbie.mypage.watch_game.entity.Ticket;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface TicketRepository extends MongoRepository<Ticket, String> {
    List<Ticket> findByUserId(int userId);
    Optional<Ticket> findFirstByUserIdOrderByIdDesc(int userID);
}
