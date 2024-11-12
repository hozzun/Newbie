package com.newbie.board.generalBoard.service;

import com.newbie.board.generalBoard.dto.GeneralBoardRequestDto;
import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.generalBoard.dto.GeneralBoardUpdateRequestDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.generalBoard.entity.GeneralBoardTag;
import com.newbie.board.generalBoard.repository.GeneralBoardRepository;
import com.newbie.board.generalBoard.repository.GeneralBoardTagRepository;
import com.newbie.board.usedBoard.entity.User;
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
    private final S3Service s3Service;

    @PersistenceContext
    private EntityManager entityManager;

    @Transactional
    public List<GeneralBoardResponseDto> getGeneralBoardList() {
        return generalBoardRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(GeneralBoardResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<GeneralBoardResponseDto> getGeneralBoardById(Long id) {
        return generalBoardRepository.findById(id)
                .map(GeneralBoardResponseDto::new);
    }

    @Transactional
    public List<GeneralBoardResponseDto> searchBoardList(String keyword) {
        return generalBoardRepository.searchByKeyword(keyword == null ? "" : keyword)
                .stream()
                .map(GeneralBoardResponseDto::new)
                .collect(Collectors.toList());
    }

    @Transactional
    public GeneralBoardResponseDto createGeneralBoard(GeneralBoardRequestDto requestDto, MultipartFile imageFile) throws IOException {
        List<GeneralBoardTag> generalBoardTags = Optional.ofNullable(requestDto.getTags())
                .orElse(Collections.emptyList())
                .stream()
                .map(tagName -> {
                    GeneralBoardTag generalBoardTag = generalBoardTagRepository.findByName(tagName)
                            .orElseGet(() -> generalBoardTagRepository.save(new GeneralBoardTag(tagName)));
                    if (!entityManager.contains(generalBoardTag)) {
                        generalBoardTag = entityManager.merge(generalBoardTag);
                    }
                    return generalBoardTag;
                })
                .collect(Collectors.toList());

        String imageUrl = (imageFile != null) ? s3Service.uploadFile(imageFile) : null;

        GeneralBoard generalBoard = GeneralBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl(imageUrl)
                .createdAt(LocalDateTime.now())
                .userId(requestDto.getUserId())
                .userName(requestDto.getUserName())
                .isDeleted("N")
                .build();

        generalBoardTags.forEach(generalBoard::addTag);
        generalBoardRepository.save(generalBoard);

        return new GeneralBoardResponseDto(generalBoard);
    }


    @Transactional
    public void updateGeneralBoard(GeneralBoardUpdateRequestDto requestDto, Long id) {
        Optional<GeneralBoard> board = generalBoardRepository.findById(id);

        if (board.isPresent()) {
            GeneralBoard existingBoard = board.get();

            GeneralBoard updatedBoard = existingBoard.toBuilder()
                    .title(requestDto.getTitle() != null ? requestDto.getTitle() : existingBoard.getTitle())
                    .content(requestDto.getContent() != null ? requestDto.getContent() : existingBoard.getContent())
                    .updatedAt(LocalDateTime.now())
                    .build();

            generalBoardRepository.save(updatedBoard);
        }
    }

    @Transactional
    public void deleteGeneralBoard(Long id) {
        Optional<GeneralBoard> board = generalBoardRepository.findById(id);

        if (board.isPresent()) {
            GeneralBoard updatedBoard = board.get().toBuilder()
                    .isDeleted("Y")
                    .build();
            generalBoardRepository.save(updatedBoard);
        }
    }
}
