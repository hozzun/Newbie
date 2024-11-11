package com.newbie.board.domain.usedBoard.repository;

import com.newbie.board.domain.usedBoard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(int userId);
}
