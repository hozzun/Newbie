package com.newbie.baseball.domain.youtube.service;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.newbie.baseball.domain.game.entity.Game;
import com.newbie.baseball.domain.game.repository.GameRepository;
import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;
import com.newbie.baseball.domain.youtube.exception.YoutubeNotFoundException;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.stereotype.Service;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;

import java.io.IOException;
import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.ArrayList;
import java.util.Collections;
import java.util.Date;
import java.util.List;

@Service
@RequiredArgsConstructor
public class YouTubeServiceImpl implements YouTubeService {

    private final GameRepository gameRepository;

    private static final Logger logger = LoggerFactory.getLogger(YouTubeServiceImpl.class);

    @Value("${youtube.api.key}")
    private String apiKey;

    private static final String KBO_CHANNEL_ID = "UCoVz66yWHzVsXAFG8WhJK9g";

    @Override
    public List<YouTubeResponseDto> searchGameHighlights(String date, String teamName1, String teamName2) {
        String formattedDate = formatDate(date);
        String query = "[KBO 하이라이트] " + formattedDate + " " + teamName1 + " vs " + teamName2;
        return searchFilteredVideo(query, KBO_CHANNEL_ID, true, 1);
    }

    @Override
    public List<YouTubeResponseDto> searchHighlightsByDate(String date) {
        String formattedDate = formatDate(date);
        String query = "[KBO 하이라이트] " + formattedDate;
        return searchFilteredVideo(query, KBO_CHANNEL_ID, true, 5);
    }

    @Override
    public List<YouTubeResponseDto> searchPlayerHighlights(String playerName) {
        String query = playerName + " 하이라이트";
        return searchFilteredVideo(query, KBO_CHANNEL_ID, false, 3);
    }

    private List<YouTubeResponseDto> searchFilteredVideo(String query, String channelId, boolean strictTitleFilter, int maxResults) {
        try {
            YouTube.Search.List search = createYouTubeSearch(query, maxResults);
            if (channelId != null) {
                search.setChannelId(channelId);
            }

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();

            return filterVideoDetails(searchResultList, strictTitleFilter, query, maxResults > 1);
        } catch (IOException e) {
            logger.error("Error occurred while searching YouTube videos", e);
            throw new YoutubeNotFoundException();
        }
    }

    private YouTube.Search.List createYouTubeSearch(String query, int maxResults) throws IOException {
        JsonFactory jsonFactory = GsonFactory.getDefaultInstance();

        YouTube youtube = new YouTube.Builder(
                new com.google.api.client.http.javanet.NetHttpTransport(),
                jsonFactory,
                request -> {})
                .setApplicationName("youtube-search")
                .build();

        YouTube.Search.List search = youtube.search().list(Collections.singletonList("id,snippet"));
        search.setKey(apiKey);
        search.setQ(query);
        search.setType(Collections.singletonList("video"));
        search.setMaxResults((long) maxResults);

        return search;
    }

    private List<YouTubeResponseDto> filterVideoDetails(List<SearchResult> searchResults, boolean strictTitleFilter, String query, boolean isPlayerHighlight) {
        if (searchResults == null || searchResults.isEmpty()) {
            throw new YoutubeNotFoundException();
        }

        List<YouTubeResponseDto> filteredVideos = new ArrayList<>();
        String playerName = query.split(" ")[0];

        for (SearchResult searchResult : searchResults) {
            String videoTitle = searchResult.getSnippet().getTitle();

            // 날짜와 팀 이름 조회 시 정확히 "[KBO 하이라이트]"로 시작하고 모든 키워드 포함
            if (strictTitleFilter && !videoTitle.startsWith("[KBO 하이라이트]")) {
                continue;
            }

            // 선수 이름 검색 시 하이라이트와 선수 이름이 포함된 경우만 필터링
            if (!strictTitleFilter && isPlayerHighlight && !(videoTitle.contains("하이라이트") && videoTitle.contains(playerName))) {
                continue;
            }

            String videoId = searchResult.getId().getVideoId();
            String videoUrl = "https://www.youtube.com/watch?v=" + videoId;
            filteredVideos.add(new YouTubeResponseDto(videoTitle, videoUrl));
        }

        if (filteredVideos.isEmpty()) {
            throw new YoutubeNotFoundException();
        }
        return filteredVideos;
    }

    private String formatDate(String date) {
        try {
            SimpleDateFormat inputFormat = new SimpleDateFormat("yyyy-MM-dd");
            SimpleDateFormat outputFormat = new SimpleDateFormat("M.dd");
            Date parsedDate = inputFormat.parse(date);
            return outputFormat.format(parsedDate);
        } catch (ParseException e) {
            logger.error("Error occurred while parsing the date format", e);
            throw new IllegalArgumentException("Invalid date format. Please use 'yyyy-MM-dd'.");
        }
    }

    @Cacheable(value = "recentHilightCache", key = "'recentGame'")
    public YouTubeResponseDto searchMostRecentGameHighlights() {
        // 최근 "경기 종료" 경기 조회
        Game recentGame = gameRepository.findMostRecentFinishedGame()
                .orElseThrow(YoutubeNotFoundException::new);

        // 팀 이름과 날짜 가져오기
        String date = recentGame.getDate(); // yyyy-MM-dd 형식으로 저장되어 있다고 가정
        String teamName1 = recentGame.getHomeTeam().getTeamName();
        String teamName2 = recentGame.getAwayTeam().getTeamName();

        // YouTube 하이라이트 검색
        return searchGameHighlights(date, teamName1, teamName2).get(0);
    }
}
