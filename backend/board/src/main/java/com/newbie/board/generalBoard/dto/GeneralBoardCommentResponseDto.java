package com.newbie.board.generalBoard.dto;

import com.newbie.board.generalBoard.entity.GeneralBoardComment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Data
@Builder
public class GeneralBoardCommentResponseDto {

    private Long id;
    private String content;
    private String userName;
    private LocalDateTime createdAt;
    private List<GeneralBoardCommentResponseDto> replies;

    public static GeneralBoardCommentResponseDto fromEntity(GeneralBoardComment generalBoardComment) {
        return GeneralBoardCommentResponseDto.builder()
                .id(generalBoardComment.getId())
                .content(generalBoardComment.getContent())
                .userName(generalBoardComment.getUserName())
                .createdAt(generalBoardComment.getCreatedAt())
                .replies(generalBoardComment.getReplies().stream()
                        .filter(reply -> "N".equals(reply.getIsDeleted()))
                        .map(GeneralBoardCommentResponseDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
