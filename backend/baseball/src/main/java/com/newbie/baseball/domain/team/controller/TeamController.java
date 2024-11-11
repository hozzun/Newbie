package com.newbie.baseball.domain.team.controller;

import com.newbie.baseball.domain.team.dto.res.TeamResponseDto;
import com.newbie.baseball.domain.team.service.TeamService;
import io.swagger.v3.oas.annotations.Operation;
import io.swagger.v3.oas.annotations.Parameter;
import io.swagger.v3.oas.annotations.tags.Tag;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
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
    public ResponseEntity<List<TeamResponseDto>> getAllTeams() {
        List<TeamResponseDto> teams = teamService.getAllTeams();
        return new ResponseEntity<>(teams, HttpStatus.OK);
    }

    @Operation(summary = "teamID로 팀 조회")
    @GetMapping("/{teamId}")
    public ResponseEntity<TeamResponseDto> getTeamById(
            @Parameter(description = "팀 ID [ 1 ~ 10 ]", example = "1") @PathVariable("teamId") Integer teamId) {
        TeamResponseDto team = teamService.getTeamById(teamId);
        return new ResponseEntity<>(team, HttpStatus.OK);
    }
}
