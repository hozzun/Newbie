package com.newbie.baseball.domain.player.dto.res;

import lombok.Builder;
import lombok.Data;

import java.io.Serial;
import java.io.Serializable;

@Builder
@Data
public class PlayerResponseDto implements Serializable {
    @Serial
    private static final long serialVersionUID = 1L;

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
    private String imageUrl;
}
