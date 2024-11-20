package com.newbie.baseball.domain.youtube.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Data
@AllArgsConstructor
public class YouTubeResponseDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

    private String title;
    private String url;
}
