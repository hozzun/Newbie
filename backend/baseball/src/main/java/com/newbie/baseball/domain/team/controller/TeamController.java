package com.newbie.baseball.domain.team.controller;

import com.newbie.baseball.domain.team.dto.res.TeamResponseDto;
import com.newbie.baseball.domain.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RequiredArgsConstructor
@RestController
@Tag(name = "팀 조회 API")
@RequestMapping("/teams")
public class TeamController {

    private final TeamService teamService;

    @Operation(summary = "전체 팀 조회")
    @GetMapping
    public List<TeamResponseDto> getAllTeams() {
        return teamService.getAllTeams();
    }

    @Operation(summary = "ID로 팀 조회")
    @GetMapping("/{id}")
    public TeamResponseDto getTeamById(@PathVariable Integer id) {
        return teamService.getTeamById(id);
    }
}
