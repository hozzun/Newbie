package com.newbie.board.generalBoard.service;

import com.newbie.board.config.BoardMileageProducer;
import com.newbie.board.generalBoard.dto.GeneralBoardRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.generalBoard.dto.GeneralBoardUpdateRequestDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardTagRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardCommentRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardLikeRepository;
import com.newbie.board.scrap.repository.ScrapRepository;
import com.newbie.board.usedBoard.service.S3Service;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.Collections;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class GeneralBoardService {

    private final GeneralBoardRepository generalBoardRepository;
    private final GeneralBoardTagRepository generalBoardTagRepository;
    private final GeneralBoardCommentRepository commentRepository;
    private final GeneralBoardLikeRepository likeRepository;
    private final ScrapRepository scrapRepository;
    private final S3Service s3Service;
    private final BoardMileageProducer mileageProducer;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<GeneralBoardResponseDto> getGeneralBoardList() {
        return generalBoardRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toGeneralBoardResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<GeneralBoardResponseDto> getGeneralBoardById(Long id) {
        return generalBoardRepository.findById(id)
                .map(generalBoard -> {
                    generalBoard.setViewCount(generalBoard.getViewCount() + 1);
                    generalBoardRepository.save(generalBoard);

                    return toGeneralBoardResponseDto(generalBoard);
                });
    }

    @Transactional
    public List<GeneralBoardResponseDto> searchBoardList(String keyword, String type) {
        List<GeneralBoard> boards;
        switch (type) {
            case "title":
                boards = generalBoardRepository.searchByTitle(keyword);
                break;
            case "tags":
                boards = generalBoardRepository.searchByTag(keyword);
                break;
            case "username":
                boards = generalBoardRepository.searchByUsername(keyword);
                break;
            default:
                throw new IllegalArgumentException("Invalid search type: " + type);
        }
        return boards.stream()
                .map(this::toGeneralBoardResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public GeneralBoardResponseDto createGeneralBoard(GeneralBoardRequestDto requestDto, MultipartFile imageFile) throws IOException {
        List<GeneralBoardTag> generalBoardTags = Optional.ofNullable(requestDto.getTags())
                .orElse(Collections.emptyList())
                .stream()
                .map(tagName -> generalBoardTagRepository.findByName(tagName)
                        .orElseGet(() -> generalBoardTagRepository.save(new GeneralBoardTag(tagName))))
                .collect(Collectors.toList());

        String imageUrl = (imageFile != null) ? s3Service.uploadFile(imageFile) : null;

        GeneralBoard generalBoard = GeneralBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl(imageUrl)
                .createdAt(LocalDateTime.now())
                .userId(Long.valueOf(requestDto.getUserId()))
                .userName(requestDto.getUserName())
                .isDeleted("N")
                .build();

        generalBoardTags.forEach(generalBoard::addTag);
        generalBoardRepository.save(generalBoard);

        mileageProducer.sendMileageUpdate(requestDto.getUserId(), 500, "게시글 작성");

        return toGeneralBoardResponseDto(generalBoard);
    }

    @Transactional
    public void updateGeneralBoard(GeneralBoardUpdateRequestDto requestDto, Long id) {
        generalBoardRepository.findById(id).ifPresent(existingBoard -> {
            GeneralBoard updatedBoard = existingBoard.toBuilder()
                    .title(Optional.ofNullable(requestDto.getTitle()).orElse(existingBoard.getTitle()))
                    .content(Optional.ofNullable(requestDto.getContent()).orElse(existingBoard.getContent()))
                    .updatedAt(LocalDateTime.now())
                    .build();

            generalBoardRepository.save(updatedBoard);
        });
    }

    @Transactional
    public void deleteGeneralBoard(Long id) {
        generalBoardRepository.findById(id).ifPresent(board -> {
            GeneralBoard updatedBoard = board.toBuilder()
                    .isDeleted("Y")
                    .build();
            generalBoardRepository.save(updatedBoard);
        });
    }

    @Transactional
    public void markPostsAsDeletedByUserId(Long userId) {
        generalBoardRepository.updatePostsAsDeletedByUserId(userId);
    }

    private GeneralBoardResponseDto toGeneralBoardResponseDto(GeneralBoard generalBoard) {
        int commentCount = commentRepository.countByGeneralBoardIdAndIsDeleted(generalBoard.getId(), "N");
        int likeCount = likeRepository.countByGeneralBoardId(generalBoard.getId());
        int scrapCount = scrapRepository.countByGeneralBoardId(generalBoard.getId());

        return GeneralBoardResponseDto.builder()
                .id(generalBoard.getId())
                .userId(generalBoard.getUserId())
                .userName(generalBoard.getUserName())
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
}
