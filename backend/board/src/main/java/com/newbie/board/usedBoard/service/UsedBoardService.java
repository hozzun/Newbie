package com.newbie.board.usedBoard.service;

import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.dto.UsedBoardResponseDto;
import com.newbie.board.usedBoard.dto.UsedBoardUpdateRequestDto;
import com.newbie.board.usedBoard.entity.Tag;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.User;
import com.newbie.board.usedBoard.repository.TagRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import com.newbie.board.usedBoard.repository.UserRepository;
import jakarta.persistence.EntityManager;
import jakarta.persistence.PersistenceContext;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import javax.swing.text.html.Option;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.List;
import java.util.Optional;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsedBoardService {

    private final UsedBoardRepository usedBoardRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;
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
                .map(UsedBoardResponseDto::new); // 엔티티를 DTO로 변환
    }

    /**
     * 중고 거래 게시글을 keyword 기준으로 조회합니다. 기본 값은 제목입니다.
     * @param keyword 제목, 태그, 이름
     * @return
     */
    public List<UsedBoardResponseDto> searchBoardList(String keyword) {
        return usedBoardRepository.searchByKeyword(keyword == null ? "" : keyword)
                .stream()
                .map(UsedBoardResponseDto::new) // 엔티티를 DTO로 변환
                .collect(Collectors.toList());
    }


    /**
     * 유저가 게시글을 생성합니다.
     * @param requestDto
     */
    @Transactional
    public void createUsedBoard(UsedBoardRequestDto requestDto) throws IOException {
        // 사용자 정보 조회
        User user = userRepository.findByUserId(requestDto.getUserId());

        // 태그 목록 조회 및 생성
        List<Tag> tags = requestDto.getTags().stream()
                .map(tagName -> {
                    Tag tag = tagRepository.findByName(tagName)
                            .orElseGet(() -> tagRepository.save(new Tag(tagName)));

                    // 태그가 영속성 컨텍스트에 없으면 병합
                    if (!entityManager.contains(tag)) {
                        tag = entityManager.merge(tag);
                    }
                    return tag;
                })
                .collect(Collectors.toList());

        // 이미지 파일을 S3에 업로드하고 URL 반환
        String imageUrl = s3Service.uploadFile(requestDto.getImageFile());

        // UsedBoard 엔티티 생성
        UsedBoard usedBoard = UsedBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl(imageUrl)
                .price(requestDto.getPrice())
                .createdAt(LocalDateTime.now())
                .region(requestDto.getRegion())
                .user(user)
                .isDeleted("N")
                .build();

        // 태그를 UsedBoard에 추가하여 중간 테이블 매핑
        tags.forEach(usedBoard::addTag);

        // UsedBoard 저장
        usedBoardRepository.save(usedBoard);
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

            // Builder 패턴을 통해 null이 아닌 필드만 업데이트
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
