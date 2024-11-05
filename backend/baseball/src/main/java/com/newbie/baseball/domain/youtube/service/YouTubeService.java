package com.newbie.baseball.domain.youtube.service;

import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;

import java.io.IOException;
import java.util.List;

public interface YouTubeService {

    List<YouTubeResponseDto> searchVideos(String query) throws IOException;
}
