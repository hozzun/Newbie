package com.newbie.baseball.domain.song.dto.res;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class SongResponseDto {

    private String title;
    private String url;
}
