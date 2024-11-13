package com.newbie.board.scrap.service;

import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.scrap.dto.ScrapResponseDto;
import com.newbie.board.scrap.entity.Scrap;
import com.newbie.board.scrap.repository.ScrapRepository;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.repository.UsedBoardCommentRepository;
import com.newbie.board.usedBoard.repository.UsedBoardLikeRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class ScrapService {

    private final ScrapRepository scrapRepository;
    private final GeneralBoardRepository generalBoardRepository;
    private final UsedBoardRepository usedBoardRepository;
    private final GeneralBoardCommentRepository generalBoardCommentRepository;
    private final GeneralBoardLikeRepository generalBoardLikeRepository;
    private final UsedBoardCommentRepository usedBoardCommentRepository;
    private final UsedBoardLikeRepository usedBoardLikeRepository;

    @Transactional
    public String toggleScrap(Long userId, Long boardId, String boardType) {
        if ("general".equals(boardType)) {
            GeneralBoard generalBoard = generalBoardRepository.findById(boardId)
                    .orElseThrow(() -> new RuntimeException("General board not found"));

            Optional<Scrap> existingScrap = scrapRepository.findByUserIdAndGeneralBoard(userId, generalBoard);
            if (existingScrap.isPresent()) {
                scrapRepository.delete(existingScrap.get());
                return "스크랩이 취소되었습니다.";
            }

            Scrap scrap = Scrap.builder()
                    .userId(userId)
                    .generalBoard(generalBoard)
                    .createdAt(LocalDateTime.now())
                    .build();
            scrapRepository.save(scrap);
            return "스크랩이 등록되었습니다.";

        } else if ("used".equals(boardType)) {
            UsedBoard usedBoard = usedBoardRepository.findById(boardId)
                    .orElseThrow(() -> new RuntimeException("Used board not found"));

            Optional<Scrap> existingScrap = scrapRepository.findByUserIdAndUsedBoard(userId, usedBoard);
            if (existingScrap.isPresent()) {
                scrapRepository.delete(existingScrap.get());
                return "스크랩이 취소되었습니다.";
            }

            Scrap scrap = Scrap.builder()
                    .userId(userId)
                    .usedBoard(usedBoard)
                    .createdAt(LocalDateTime.now())
                    .build();
            scrapRepository.save(scrap);
            return "스크랩이 등록되었습니다.";

        } else {
            throw new IllegalArgumentException("Invalid board type");
        }
    }

    public List<ScrapResponseDto> getScrapList(Long userId) {
        List<Scrap> scraps = scrapRepository.findByUserId(userId);

        return scraps.stream()
                .map(scrap -> {
                    Long boardId;
                    String boardType;
                    String boardTitle;
                    String content = null;
                    String imageUrl = null;
                    String username = null;
                    int commentCount = 0;
                    int likeCount = 0;
                    int scrapCount = 0;
                    int viewCount = 0;

                    if (scrap.getGeneralBoard() != null) {
                        boardId = scrap.getGeneralBoard().getId();
                        boardType = "general";
                        GeneralBoard generalBoard = generalBoardRepository.findById(boardId)
                                .orElseThrow(() -> new RuntimeException("General board not found"));
                        boardTitle = generalBoard.getTitle();
                        content = generalBoard.getContent();
                        imageUrl = generalBoard.getImageUrl();
                        username = generalBoard.getUserName();
                        commentCount = generalBoardCommentRepository.countByGeneralBoardIdAndIsDeleted(boardId, "N");
                        likeCount = generalBoardLikeRepository.countByGeneralBoardId(boardId);
                        scrapCount = scrapRepository.countByGeneralBoardId(boardId);
                        viewCount = generalBoard.getViewCount();

                    } else if (scrap.getUsedBoard() != null) {
                        boardId = scrap.getUsedBoard().getId();
                        boardType = "used";
                        UsedBoard usedBoard = usedBoardRepository.findById(boardId)
                                .orElseThrow(() -> new RuntimeException("Used board not found"));
                        boardTitle = usedBoard.getTitle();
                        content = usedBoard.getContent();
                        imageUrl = usedBoard.getImageUrl();
                        username = usedBoard.getUserName();
                        commentCount = usedBoardCommentRepository.countByUsedBoardIdAndIsDeleted(boardId, "N");
                        likeCount = usedBoardLikeRepository.countByUsedBoardId(boardId);
                        scrapCount = scrapRepository.countByUsedBoardId(boardId);
                        viewCount = usedBoard.getViewCount();

                    } else {
                        throw new IllegalStateException("Scrap entry with no associated board");
                    }

                    return ScrapResponseDto.builder()
                            .id(scrap.getId())
                            .userId(scrap.getUserId())
                            .boardId(boardId)
                            .boardType(boardType)
                            .boardTitle(boardTitle)
                            .content(content)
                            .imageUrl(imageUrl)
                            .username(username)
                            .commentCount(commentCount)
                            .likeCount(likeCount)
                            .scrapCount(scrapCount)
                            .viewCount(viewCount)
                            .createdAt(scrap.getCreatedAt())
                            .build();
                })
                .collect(Collectors.toList());
    }

}
