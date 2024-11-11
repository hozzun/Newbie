package com.newbie.baseball.domain.player.dto.res;

import lombok.Builder;
import lombok.Data;

@Builder
@Data
public class PlayerResponseDto {

    private Integer id;
    private String backNumber;
    private String name;
    private Integer teamId;
    private String teamName;
    private String position;
    private String birth;
    private String physical;
    private String academic;
    private Integer likeCount;
}
