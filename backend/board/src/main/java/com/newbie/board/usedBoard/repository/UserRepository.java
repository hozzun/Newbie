package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(int userId);
}
