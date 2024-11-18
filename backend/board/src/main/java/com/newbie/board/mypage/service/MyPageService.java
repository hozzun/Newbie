package com.newbie.board.mypage.service;

import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.mypage.dto.MyPageBoardResponseDto;
import com.newbie.board.scrap.repository.ScrapRepository;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardTag;
import com.newbie.board.usedBoard.repository.UsedBoardCommentRepository;
import com.newbie.board.usedBoard.repository.UsedBoardLikeRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Collections;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class MyPageService {

    private final GeneralBoardRepository generalBoardRepository;
    private final UsedBoardRepository usedBoardRepository;
    private final UsedBoardCommentRepository usedBoardCommentRepository;
    private final GeneralBoardCommentRepository generalBoardCommentRepository;
    private final UsedBoardLikeRepository usedBoardLikeRepository;
    private final GeneralBoardLikeRepository generalBoardLikeRepository;
    private final ScrapRepository scrapRepository;

    /**
     * 사용자 ID에 해당하는 게시글 목록을 조회하여 반환합니다.
     * @param memberId 사용자 ID
     * @return MyPageBoardResponseDto
     */
    @Transactional
    public MyPageBoardResponseDto getMyPageBoardList(String memberId) {
        Long userId = Long.valueOf(memberId);
        List<GeneralBoardResponseDto> generalBoards = generalBoardRepository.findActiveByUserId(userId).stream()
                .map(this::toGeneralBoardResponseDto)
                .collect(Collectors.toList());

        List<UsedBoardResponseDto> usedBoards = usedBoardRepository.findActiveByUserId(userId).stream()
                .map(this::toUsedBoardResponseDto)
                .collect(Collectors.toList());

        return MyPageBoardResponseDto.builder()
                .generalBoards(generalBoards.isEmpty() ? Collections.emptyList() : generalBoards)
                .usedBoards(usedBoards.isEmpty() ? Collections.emptyList() : usedBoards)
                .build();
    }

    private GeneralBoardResponseDto toGeneralBoardResponseDto(GeneralBoard generalBoard) {
        int commentCount = generalBoardCommentRepository.countByGeneralBoardIdAndIsDeleted(generalBoard.getId(), "N");
        int likeCount = generalBoardLikeRepository.countByGeneralBoardId(generalBoard.getId());
        int scrapCount = scrapRepository.countByGeneralBoardId(generalBoard.getId());

        return GeneralBoardResponseDto.builder()
                .id(generalBoard.getId())
                .userId(generalBoard.getUserId())
                .title(generalBoard.getTitle())
                .content(generalBoard.getContent())
                .imageUrl(generalBoard.getImageUrl())
                .createdAt(generalBoard.getCreatedAt())
                .updatedAt(generalBoard.getUpdatedAt())
                .tags(generalBoard.getGeneralBoardTags().stream()
                        .map(GeneralBoardTag::getName)
                        .collect(Collectors.toList()))
                .commentCount(commentCount)
                .likeCount(likeCount)
                .scrapCount(scrapCount)
                .viewCount(generalBoard.getViewCount())
                .build();
    }

    private UsedBoardResponseDto toUsedBoardResponseDto(UsedBoard usedBoard) {
        int commentCount = usedBoardCommentRepository.countByUsedBoardIdAndIsDeleted(usedBoard.getId(), "N");
        int likeCount = usedBoardLikeRepository.countByUsedBoardId(usedBoard.getId());
        int scrapCount = scrapRepository.countByUsedBoardId(usedBoard.getId());

        return UsedBoardResponseDto.builder()
                .id(usedBoard.getId())
                .userId(usedBoard.getUserId())
                .title(usedBoard.getTitle())
                .content(usedBoard.getContent())
                .imageUrl(usedBoard.getImageUrl())
                .createdAt(usedBoard.getCreatedAt())
                .price(usedBoard.getPrice())
                .tags(usedBoard.getUsedBoardTags().stream()
                        .map(UsedBoardTag::getName)
                        .collect(Collectors.toList()))
                .commentCount(commentCount)
                .likeCount(likeCount)
                .scrapCount(scrapCount)
                .viewCount(usedBoard.getViewCount())
                .build();
    }
}
