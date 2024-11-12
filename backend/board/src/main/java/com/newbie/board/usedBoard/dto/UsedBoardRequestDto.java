package com.newbie.board.usedBoard.dto;

import jakarta.persistence.*;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

import java.util.ArrayList;
import java.util.List;

@Data
@Builder
@AllArgsConstructor
public class UsedBoardRequestDto {

    private int userId;
    private String title;
    private String content;
    private List<String> tags = new ArrayList<>();
    private MultipartFile imageFile;
    private Integer price;
    private String region;
}
