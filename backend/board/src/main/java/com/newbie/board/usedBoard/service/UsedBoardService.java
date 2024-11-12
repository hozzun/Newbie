package com.newbie.board.usedBoard.service;

import com.newbie.board.usedBoard.dto.UsedBoardRequestDto;
import com.newbie.board.usedBoard.entity.Tag;
import com.newbie.board.usedBoard.entity.UsedBoard;
import com.newbie.board.usedBoard.entity.User;
import com.newbie.board.usedBoard.repository.TagRepository;
import com.newbie.board.usedBoard.repository.UsedBoardRepository;
import com.newbie.board.usedBoard.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class UsedBoardService {

    private final UsedBoardRepository usedBoardRepository;
    private final TagRepository tagRepository;
    private final UserRepository userRepository;


    /**
     * 중고 거래 게시글을 keyword 기준으로 조회합니다. 기본 값은 제목입니다.
     * @param keyword 제목, 태그, 이름
     * @return
     */
    public List<UsedBoard> getBoardList(String keyword) {
        return usedBoardRepository.searchByKeyword(keyword == null ? "" : keyword);
    }
    /**
     * 유저가 게시글을 생성합니다.
     * @param requestDto
     */
    public void createUsedBoard(UsedBoardRequestDto requestDto) {
        User user = userRepository.findByUserId(requestDto.getUserId());

        List<Tag> tags = requestDto.getTags().stream()
                .map(tagName -> tagRepository.findByName(tagName)
                        .orElseGet(() -> tagRepository.save(new Tag(tagName))))
                .collect(Collectors.toList());

        UsedBoard usedBoard = UsedBoard.builder()
                .title(requestDto.getTitle())
                .content(requestDto.getContent())
                .imageUrl("aasdfasdgaswe")
                .price(requestDto.getPrice())
                .createdAt(LocalDateTime.now())
                .region(requestDto.getRegion())
                .user(user)
                .tags(tags)
                .build();

        usedBoardRepository.save(usedBoard);
    }
}
