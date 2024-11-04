package com.newbie.baseball.domain.youtube.dto.res;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class YouTubeResponseDto {

    private String title;
    private String description;
    private String url;
}
