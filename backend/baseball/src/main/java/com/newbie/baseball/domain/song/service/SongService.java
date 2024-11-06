package com.newbie.baseball.domain.song.service;

public interface SongService {

    String getTeamCheeringSong(String teamName);
    String getPlayerCheeringSong(String teamName, String playerName);
}
