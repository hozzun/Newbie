package com.newbie.baseball.domain.song.service;

import com.newbie.baseball.domain.song.dto.res.SongResponseDto;

import java.util.List;

public interface SongService {

    List<SongResponseDto> getTeamCheeringSongs(String teamName);
    SongResponseDto getPlayerCheeringSong(String teamName, String playerName);
}
