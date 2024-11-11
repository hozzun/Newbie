package com.newbie.board.usedBoard.repository;

import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.User;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<User, Long> {
    User findByUserId(int userId);
}
