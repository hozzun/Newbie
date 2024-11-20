package com.newbie.baseball.domain.youtube.service;

import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;

import java.io.IOException;
import java.util.List;

public interface YouTubeService {

//    List<YouTubeResponseDto> searchHighlightsByDate(String date);
    List<YouTubeResponseDto> searchGameHighlights(String date, String teamName1, String teamName2);
    List<YouTubeResponseDto> searchPlayerHighlights(String playerName);
    List<YouTubeResponseDto> searchHighlightsByDate(String date);
}
