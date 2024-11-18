package com.newbie.mypage.recommend.controller;

import com.newbie.mypage.recommend.dto.RecoRequestDto;
import com.newbie.mypage.recommend.dto.RecoResponseDto;
import com.newbie.mypage.recommend.service.RecoService;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestHeader;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.web.client.RestTemplate;

@RestController
@RequiredArgsConstructor
public class RecoController {

    private final RestTemplate restTemplate = new RestTemplate();
    private final RecoService recoService;

    @PostMapping("/recommend")
    public RecoResponseDto recommendTeam(@RequestBody RecoRequestDto requestDto,
                                         @RequestHeader("X-Member-ID") String userId) {
       return recoService.recommendTeam(requestDto, userId).getBody();
    }
}
