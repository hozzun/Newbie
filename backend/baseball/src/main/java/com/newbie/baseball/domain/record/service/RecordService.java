package com.newbie.baseball.domain.record.service;

import com.newbie.baseball.domain.record.dto.res.RecordResponseDto;

public interface RecordService {

    RecordResponseDto getRecordByGameId(Integer gameId);
}
