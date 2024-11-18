package com.newbie.mypage.recommend.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
@Builder
public class RecoRequestFastApiDto {
    private String mbti;
    private List<Integer> responses;
    private String region;
    private String userId; // 추가
}
