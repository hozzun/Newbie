package com.newbie.board.usedBoard.service;

import com.newbie.board.mypage.dto.UserResponseDto;
import com.newbie.board.scrap.repository.ScrapRepository;
import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardUpdateRequestDto;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.UsedBoardTag;
import com.newbie.board.usedBoard.repository.UsedBoardTagRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import com.newbie.board.usedBoard.repository.UsedBoardCommentRepository;
import com.newbie.board.usedBoard.repository.UsedBoardLikeRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
@Slf4j
public class UsedBoardService {

    private final UsedBoardRepository usedBoardRepository;
    private final UsedBoardTagRepository usedBoardTagRepository;
    private final UsedBoardCommentRepository commentRepository;
    private final UsedBoardLikeRepository likeRepository;
    private final ScrapRepository scrapRepository;
    private final S3Service s3Service;
    private final RestTemplate restTemplate = new RestTemplate();

    @Value("${user.server.domain}")
    private String userServerDomain;

    @Value("${server.path}")
    private String userPort;

    @PersistenceContext
    private EntityManager entityManager;

    public List<UsedBoardResponseDto> getUsedBoardList() {
        return usedBoardRepository.findAllByOrderByCreatedAtDesc().stream()
                .map(this::toUsedBoardListResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public Optional<UsedBoardResponseDto> getUsedBoardById(Long id, String userId) {
        return usedBoardRepository.findById(id)
                .map(usedBoard -> {
                    // viewCount 증가
                    usedBoard.setViewCount(usedBoard.getViewCount() + 1);
                    usedBoardRepository.save(usedBoard); // 변경 사항 저장

                    // DTO로 변환하여 반환
                    return toUsedBoardResponseDto(usedBoard, Long.valueOf(userId));
                });
    }


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
                .map(this::toUsedBoardListResponseDto)
                .collect(Collectors.toList());
    }

    @Transactional
    public UsedBoardResponseDto createUsedBoard(UsedBoardRequestDto requestDto, MultipartFile imageFile, String memberId) throws IOException {
        Long userId = Long.valueOf(memberId);
        List<UsedBoardTag> usedBoardTags = requestDto.getTags().stream()
                .map(tagName -> usedBoardTagRepository.findByName(tagName)
                        .orElseGet(() -> usedBoardTagRepository.save(new UsedBoardTag(tagName))))
                .collect(Collectors.toList());

        ResponseEntity<UserResponseDto> responseDto = getUserProfile(userId);

        String imageUrl = s3Service.uploadFile(imageFile);

        UsedBoard usedBoard = UsedBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl(imageUrl)
                .price(requestDto.getPrice())
                .createdAt(LocalDateTime.now())
                .region(requestDto.getRegion())
                .userId(userId)
                .userName(responseDto.getBody().getNickname())
                .profile(responseDto.getBody().getProfileImage())
                .isDeleted("N")
                .build();

        usedBoardTags.forEach(usedBoard::addTag);
        usedBoardRepository.save(usedBoard);

        return toUsedBoardResponseDto(usedBoard, userId);
    }

    @Transactional
    public void updateUsedBoard(UsedBoardUpdateRequestDto requestDto, Long id) {
        Optional<UsedBoard> board = usedBoardRepository.findById(id);
        if (board.isPresent()) {
            UsedBoard existingBoard = board.get();

            UsedBoard updatedBoard = existingBoard.toBuilder()
                    .title(Optional.ofNullable(requestDto.getTitle()).orElse(existingBoard.getTitle()))
                    .content(Optional.ofNullable(requestDto.getContent()).orElse(existingBoard.getContent()))
                    .price(Optional.ofNullable(requestDto.getPrice()).orElse(existingBoard.getPrice()))
                    .region(Optional.ofNullable(requestDto.getRegion()).orElse(existingBoard.getRegion()))
                    .updatedAt(LocalDateTime.now())
                    .build();

            usedBoardRepository.save(updatedBoard);
        }
    }

    @Transactional
    public void deleteUsedBoard(Long id) {
        Optional<UsedBoard> board = usedBoardRepository.findById(id);
        if (board.isPresent()) {
            UsedBoard updatedBoard = board.get().toBuilder()
                    .isDeleted("Y")
                    .build();
            usedBoardRepository.save(updatedBoard);
        }
    }

    @Transactional
    public void markPostsAsDeletedByUserId(Long userId) {
        usedBoardRepository.updatePostsAsDeletedByUserId(userId);
    }

    private UsedBoardResponseDto toUsedBoardResponseDto(UsedBoard usedBoard, Long userId) {
        int commentCount = commentRepository.countByUsedBoardIdAndIsDeleted(usedBoard.getId(), "N");
        int likeCount = likeRepository.countByUsedBoardId(usedBoard.getId());
        int scrapCount = scrapRepository.countByUsedBoardId(usedBoard.getId());

        boolean isLikedByUser = likeRepository.existsByUsedBoardIdAndUserId(usedBoard.getId(), userId);
        boolean isScrapedByUser = scrapRepository.existsByUsedBoardIdAndUserId(usedBoard.getId(), userId);


        return UsedBoardResponseDto.builder()
                .id(usedBoard.getId())
                .title(usedBoard.getTitle())
                .userId(usedBoard.getUserId())
                .userName(usedBoard.getUserName())
                .content(usedBoard.getContent())
                .price(usedBoard.getPrice())
                .region(usedBoard.getRegion())
                .profile(usedBoard.getProfile())
                .createdAt(usedBoard.getCreatedAt())
                .likeCount(likeCount)
                .commentCount(commentCount)
                .viewCount(usedBoard.getViewCount())
                .isLikedByUser(isLikedByUser)
                .isScrapedByUser(isScrapedByUser)
                .scrapCount(scrapCount)
                .build();
    }

    private UsedBoardResponseDto toUsedBoardListResponseDto(UsedBoard usedBoard) {
        int commentCount = commentRepository.countByUsedBoardIdAndIsDeleted(usedBoard.getId(), "N");
        int likeCount = likeRepository.countByUsedBoardId(usedBoard.getId());
        int scrapCount = scrapRepository.countByUsedBoardId(usedBoard.getId());

        return UsedBoardResponseDto.builder()
                .id(usedBoard.getId())
                .title(usedBoard.getTitle())
                .userId(usedBoard.getUserId())
                .content(usedBoard.getContent())
                .price(usedBoard.getPrice())
                .userName(usedBoard.getUserName())
                .profile(usedBoard.getProfile())
                .scrapCount(scrapCount)
                .region(usedBoard.getRegion())
                .createdAt(usedBoard.getCreatedAt())
                .likeCount(likeCount)
                .commentCount(commentCount)
                .viewCount(usedBoard.getViewCount())
                .build();
    }

    private ResponseEntity<UserResponseDto> getUserProfile(Long userId) {
        String url = userServerDomain + ":" + userPort + "/user/users/" + userId;
        log.info(url);
        return restTemplate.getForEntity(url, UserResponseDto.class);
    }
}
