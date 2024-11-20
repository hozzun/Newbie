package com.newbie.board.usedBoard.dto;

import com.newbie.board.usedBoard.entity.UsedBoardComment;
import lombok.Builder;
import lombok.Data;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;


@Builder
@Data
public class UsedBoardCommentResponseDto {

    private Long id;
    private String content;
    private String userName;
    private String profile;
    private LocalDateTime createdAt;
    private List<UsedBoardCommentResponseDto> replies;

    public static UsedBoardCommentResponseDto fromEntity(UsedBoardComment usedBoardComment) {
        return UsedBoardCommentResponseDto.builder()
                .id(usedBoardComment.getId())
                .content(usedBoardComment.getContent())
                .userName(usedBoardComment.getUserName())
                .profile(usedBoardComment.getProfile())
                .createdAt(usedBoardComment.getCreatedAt())
                .replies(usedBoardComment.getReplies().stream()
                        .filter(reply -> "N".equals(reply.getIsDeleted()))
                        .map(UsedBoardCommentResponseDto::fromEntity)
                        .collect(Collectors.toList()))
                .build();
    }
}
