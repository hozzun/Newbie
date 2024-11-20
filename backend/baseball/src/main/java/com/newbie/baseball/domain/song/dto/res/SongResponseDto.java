package com.newbie.baseball.domain.song.dto.res;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.io.Serial;
import java.io.Serializable;

@Getter
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class SongResponseDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String title;
    private String url;
    private String lyrics;
}
