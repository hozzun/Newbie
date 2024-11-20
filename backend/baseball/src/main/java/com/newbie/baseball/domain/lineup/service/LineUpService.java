package com.newbie.baseball.domain.lineup.service;

import com.newbie.baseball.domain.lineup.dto.LineUpResponseDto;
import com.newbie.baseball.domain.lineup.dto.TeamLineUpResponseDto;

import java.util.List;

public interface LineUpService {

    List<TeamLineUpResponseDto> getLineUpByGameId(Integer gameId);
}
