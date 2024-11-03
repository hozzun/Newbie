package com.newbie.baseball.domain.record.repository;

import com.newbie.baseball.domain.record.entity.Record;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface RecordRepository extends JpaRepository<Record, Integer> {

    Optional<Record> findByGameId(Integer gameId);
}
