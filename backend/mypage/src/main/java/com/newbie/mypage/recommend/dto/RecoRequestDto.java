package com.newbie.mypage.recommend.dto;

import lombok.AllArgsConstructor;
import lombok.Data;

import java.util.List;

@Data
@AllArgsConstructor
public class RecoRequestDto {

    private int userId;
    private String mbti;
    private List<Integer> responses;
    private String region;
}
