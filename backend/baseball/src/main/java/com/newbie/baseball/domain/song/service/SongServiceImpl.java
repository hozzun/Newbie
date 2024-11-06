package com.newbie.baseball.domain.song.service;

import io.awspring.cloud.s3.S3Exception;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.services.s3.S3Client;

@Service
@RequiredArgsConstructor
public class SongServiceImpl implements SongService {

    private final String bucketName = "newbie-mp3-bucket";
    private final S3Client s3Client;

    @Override
    public String getTeamCheeringSong(String teamName) {
        String key = "team_song/" + teamName + ".mp3";
        return getObjectUrl(key);
    }

    @Override
    public String getPlayerCheeringSong(String teamName, String playerName) {
        String key = "player_song/" + teamName + "_" + playerName + ".mp3";
        return getObjectUrl(key);
    }

    private String getObjectUrl(String key) {
        try {
            return s3Client.utilities()
                    .getUrl(builder -> builder.bucket(bucketName).key(key))
                    .toExternalForm();
        } catch (S3Exception e) {
            System.err.println("Error occurred while fetching S3 object: " + e.getMessage());
            throw new RuntimeException("파일을 가져오는 도중 문제가 발생했습니다. 파일이 존재하지 않거나 접근할 수 없습니다.");
        } catch (Exception e) {
            System.err.println("An unexpected error occurred: " + e.getMessage());
            throw new RuntimeException("알 수 없는 오류가 발생했습니다. 잠시 후 다시 시도해 주세요.");
        }
    }
}