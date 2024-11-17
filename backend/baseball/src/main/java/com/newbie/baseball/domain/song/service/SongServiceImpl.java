package com.newbie.baseball.domain.song.service;

import com.newbie.baseball.domain.song.dto.res.SongResponseDto;
import com.newbie.baseball.domain.song.exception.SongNotFoundException;
import io.awspring.cloud.s3.S3Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.cache.annotation.Cacheable;
import org.springframework.core.io.ClassPathResource;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.ListObjectsV2Request;
import software.amazon.awssdk.services.s3.model.S3Object;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.nio.charset.StandardCharsets;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final S3Client s3Client;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    @Cacheable(value = "teamSongsCache", key = "#teamName")
    @Override
    public List<SongResponseDto> getTeamCheeringSongs(String teamName) {
        String prefix = "team_song/" + teamName + "/";

        // S3에서 해당 팀 폴더의 모든 mp3 파일 리스트 조회
        List<SongResponseDto> songs = s3Client.listObjectsV2(ListObjectsV2Request.builder()
                        .bucket(bucketName)
                        .prefix(prefix)
                        .build())
                .contents()
                .stream()
                .filter(s3Object -> s3Object.key().endsWith(".mp3")) // .mp3 확장자 필터링
                .map(s3Object -> {
                    String key = s3Object.key(); // S3의 mp3 파일 경로
                    String title = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.')).replace("_", " "); // 제목 추출
                    String url = getObjectUrl(key); // S3 URL 생성
                    String lyricsFileName = teamName + "/" + title + ".txt"; // 리소스 폴더의 가사 파일 경로
                    String lyrics = getLyricsFromFile(lyricsFileName); // 리소스 폴더에서 가사 읽기

                    return SongResponseDto.builder()
                            .title(title)
                            .url(url)
                            .lyrics(lyrics)
                            .build();
                })
                .collect(Collectors.toList());

        if (songs.isEmpty()) {
            throw new SongNotFoundException();
        }
        return songs;
    }

    @Cacheable(value = "playerSongCache", key = "#playerName")
    @Override
    public SongResponseDto getPlayerCheeringSong(String teamName, String playerName) {
        String key = "player_song/" + teamName + "_" + playerName + ".mp3";
        String title = playerName + " 응원가";
        String lyricsFileName = teamName + "_" + playerName + ".txt";
        String lyrics = getLyricsFromFile(lyricsFileName);
        String url = getObjectUrl(key);

        return SongResponseDto.builder()
                .title(title)
                .url(url)
                .lyrics(lyrics)
                .build();
    }

//    private SongResponseDto toSongResponseDto(S3Object s3Object) {
//        String key = s3Object.key();
//        // 파일 이름에서 제목을 추출하여 '_'를 ' '로 대체
//        String title = key.substring(key.lastIndexOf('/') + 1, key.lastIndexOf('.')).replace("_", " ");
//        String url = getObjectUrl(key);
//
//        return SongResponseDto.builder()
//                .title(title)
//                .url(url)
//                .build();
//    }

    private String getObjectUrl(String key) {
        try {
            return s3Client.utilities()
                    .getUrl(builder -> builder.bucket(bucketName).key(key))
                    .toExternalForm();
        } catch (S3Exception e) {
            throw new SongNotFoundException();
        }
    }

    private String getLyricsFromFile(String fileName) {
        try {
            // 파일 경로 설정
            ClassPathResource resource = new ClassPathResource("lyrics/" + fileName);

            // 파일 읽기
            try (BufferedReader reader = new BufferedReader(
                    new InputStreamReader(resource.getInputStream(), StandardCharsets.UTF_8))) {

                StringBuilder lyrics = new StringBuilder();
                String line;
                while ((line = reader.readLine()) != null) {
                    lyrics.append(line).append("\n");
                }
                return lyrics.toString().trim(); // 마지막 개행 제거
            }
        } catch (IOException e) {
            return "가사를 찾을 수 없습니다."; // 파일이 없거나 읽기 실패 시 기본 메시지
        }
    }
}
