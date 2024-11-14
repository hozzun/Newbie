package com.newbie.board.usedBoard.service;

import com.newbie.board.generalBoard.dto.GeneralBoardResponseDto;
import com.newbie.board.generalBoard.entity.GeneralBoard;
import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardUpdateRequestDto;
import com.newbie.board.usedBoard.entity.UsedBoardTag;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.repository.UsedBoardTagRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsedBoardService {

    private final UsedBoardRepository usedBoardRepository;
    private final UsedBoardTagRepository usedBoardTagRepository;
    private final S3Service s3Service;

    @PersistenceContext
    private EntityManager entityManager;


    /**
     * 게시글 전체를 최신순으로 조회합니다.
     * @return List<UsedBoard>
     */
    public List<UsedBoardResponseDto> getUsedBoardList() {
        return usedBoardRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(UsedBoardResponseDto::new)
                .collect(Collectors.toList());
    }

    /**
     * 특정 게시글을 조회합니다.
     * @param id
     * @return
     */
    public Optional<UsedBoardResponseDto> getUsedBoardById(Long id) {
        return usedBoardRepository.findById(id)
                .map(UsedBoardResponseDto::new);
    }

    /**
     * 중고 거래 게시글을 keyword 기준으로 조회합니다. 기본 값은 제목입니다.
     * @param keyword 제목, 태그, 이름
     * @return
     */
    @Transactional
    public List<UsedBoardResponseDto> searchBoardList(String keyword, String type) {
        List<UsedBoard> boards;
        switch (type) {
            case "title":
                boards = usedBoardRepository.searchByTitle(keyword);
                break;
            case "tags":
                boards = usedBoardRepository.searchByTag(keyword);
                break;
            case "username":
                boards = usedBoardRepository.searchByUsername(keyword);
                break;
            default:
                throw new IllegalArgumentException("Invalid search type: " + type);
        }

        return boards.stream()
                .map(UsedBoardResponseDto::new)
                .collect(Collectors.toList());
    }


    /**
     * 유저가 게시글을 생성합니다.
     * @param requestDto
     */
    @Transactional
    public UsedBoardResponseDto createUsedBoard(UsedBoardRequestDto requestDto, MultipartFile imageFile) throws IOException {

        List<UsedBoardTag> usedBoardTags = requestDto.getTags().stream()
                .map(tagName -> {
                    UsedBoardTag usedBoardTag = usedBoardTagRepository.findByName(tagName)
                            .orElseGet(() -> usedBoardTagRepository.save(new UsedBoardTag(tagName)));

                    if (!entityManager.contains(usedBoardTag)) {
                        usedBoardTag = entityManager.merge(usedBoardTag);
                    }
                    return usedBoardTag;
                })
                .collect(Collectors.toList());

        String imageUrl = s3Service.uploadFile(imageFile);

        UsedBoard usedBoard = UsedBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl(imageUrl)
                .price(requestDto.getPrice())
                .createdAt(LocalDateTime.now())
                .region(requestDto.getRegion())
                .userId(requestDto.getUserId())
                .userName(requestDto.getUserName())
                .isDeleted("N")
                .build();

        usedBoardTags.forEach(usedBoard::addTag);

        usedBoardRepository.save(usedBoard);

        return new UsedBoardResponseDto(usedBoard);
    }



    /**
     * 유저가 게시글을 업데이트합니다.
     * @param requestDto
     * @param id
     */
    public void updateUsedBoard(UsedBoardUpdateRequestDto requestDto, Long id) {
        Optional<UsedBoard> board = usedBoardRepository.findById(id);

        if (board.isPresent()) {
            UsedBoard existingBoard = board.get();

            UsedBoard updatedBoard = existingBoard.toBuilder()
                    .title(requestDto.getTitle() != null ? requestDto.getTitle() : existingBoard.getTitle())
                    .content(requestDto.getContent() != null ? requestDto.getContent() : existingBoard.getContent())
                    .price((requestDto.getPrice() != null) ? requestDto.getPrice() : existingBoard.getPrice())
                    .region(requestDto.getRegion() != null ? requestDto.getRegion() : existingBoard.getRegion())
                    .updatedAt(LocalDateTime.now())
                    .build();

            usedBoardRepository.save(updatedBoard);
        }
    }

    /**
     * 유저가 게시글을 삭제합니다.
     * @param id
     */
    public void deleteUsedBoard(Long id) {
        Optional<UsedBoard> board = usedBoardRepository.findById(id);

        if (board.isPresent()) {
            UsedBoard updatedBoard = board.get().toBuilder()
                    .isDeleted("Y")
                    .build();
            usedBoardRepository.save(updatedBoard);
        }
    }
}
