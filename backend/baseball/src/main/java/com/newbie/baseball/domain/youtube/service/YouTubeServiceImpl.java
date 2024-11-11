package com.newbie.baseball.domain.youtube.service;

import com.google.api.client.json.JsonFactory;
import com.google.api.client.json.gson.GsonFactory;
import com.google.api.services.youtube.YouTube;
import com.google.api.services.youtube.model.SearchListResponse;
import com.google.api.services.youtube.model.SearchResult;
import com.newbie.baseball.domain.youtube.dto.res.YouTubeResponseDto;
import com.newbie.baseball.domain.youtube.exception.YoutubeNotFoundException;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import java.io.IOException;
import java.util.ArrayList;
import java.util.Collections;
import java.util.List;

@Service
public class YouTubeServiceImpl implements YouTubeService {

    @Value("${youtube.api.key}")
    private String apiKey;

    public List<YouTubeResponseDto> searchVideos(String query) {
        try {
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
            search.setMaxResults(3L);

            SearchListResponse searchResponse = search.execute();
            List<SearchResult> searchResultList = searchResponse.getItems();

            return extractVideoDetails(searchResultList);
        } catch (IOException e) {
            throw new YoutubeNotFoundException();
        }
    }
    private List<YouTubeResponseDto> extractVideoDetails(List<SearchResult> searchResults) {
        if (searchResults == null || searchResults.isEmpty()) {
            throw new YoutubeNotFoundException();
        }

        List<YouTubeResponseDto> videoDetails = new ArrayList<>();
        for (SearchResult searchResult : searchResults) {
            String videoId = searchResult.getId().getVideoId();
            String videoTitle = searchResult.getSnippet().getTitle();
            String videoUrl = "https://www.youtube.com/watch?v=" + videoId;
            videoDetails.add(new YouTubeResponseDto(videoTitle, videoUrl));
        }

        return videoDetails;
    }
}
