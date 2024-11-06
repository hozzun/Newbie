package com.newbie.mypage.watch_game.service;

import com.newbie.mypage.watch_game.dto.TicketResponseDto;
import com.newbie.mypage.watch_game.entity.Ticket;
import com.newbie.mypage.watch_game.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    /**
     * 사용자의 경기 관람 리스트 반환
     * @param userId
     * @return
     */
    public List<TicketResponseDto> getTicketList(int userId) {
        List<Ticket> tickets = ticketRepository.findByUserId(userId);
        return tickets.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TicketResponseDto getTicket(String id) {
        Ticket ticket = ticketRepository.findById(id).orElseThrow(() -> new IllegalArgumentException("Ticket not found"));
        return convertToDto(ticket);
    }

    public void deleteTicket(String id) {
        ticketRepository.deleteById(id);
    }

    public void updateText(String id, String text) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        // 기존 필드 정보를 유지하면서 text 필드만 업데이트
        Ticket updatedTicket = Ticket.builder()
                .id(ticket.getId())
                .userId(ticket.getUserId())
                .date(ticket.getDate())
                .team1English(ticket.getTeam1English())
                .team2English(ticket.getTeam2English())
                .team1Korean(ticket.getTeam1Korean())
                .team2Korean(ticket.getTeam2Korean())
                .imageUrl(ticket.getImageUrl())
                .text(text)  // text 필드만 새로 설정
                .build();

        ticketRepository.save(updatedTicket);  // 수정된 객체를 저장
    }


    private TicketResponseDto convertToDto(Ticket ticket) {
        return TicketResponseDto.builder()
                .id(ticket.getId())
                .userId(ticket.getUserId())
                .date(ticket.getDate())
                .team1English(ticket.getTeam1English())
                .team2English(ticket.getTeam2English())
                .team1Korean(ticket.getTeam1Korean())
                .team2Korean(ticket.getTeam2Korean())
                .imageUrl(ticket.getImageUrl())
                .build();
    }
}
