package com.newbie.baseball.domain.lineup.service;

import com.newbie.baseball.domain.lineup.dto.LineUpResponseDto;

import java.util.List;

public interface LineUpService {

    List<LineUpResponseDto> getLineUpByGameId(Integer gameId);
}
