package com.newbie.mypage.recommend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class RecoRequestDto {

    private String mbti;
    private List<Integer> responses;
    private String region;
}
