package com.newbie.mypage.watch_game.service;

import com.newbie.mypage.watch_game.dto.TicketResponseDto;
import com.newbie.mypage.watch_game.entity.Ticket;
import com.newbie.mypage.watch_game.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.stereotype.Service;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.stream.Collectors;

@Service
@RequiredArgsConstructor
public class TicketService {

    private final TicketRepository ticketRepository;

    /**
     * 사용자의 경기 관람 리스트 반환
     * @param memberId
     * @return
     */
    public List<TicketResponseDto> getTicketList(String memberId) {
        int userId = Integer.parseInt(memberId);
        List<Ticket> tickets = ticketRepository.findByUserId(userId);
        return tickets.stream()
                .map(this::convertToDto)
                .collect(Collectors.toList());
    }

    public TicketResponseDto getTicket(String id) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        return convertToDto(ticket);
    }

    public TicketResponseDto getLatestTicket(String userId) {
        Ticket latestTicket = ticketRepository.findFirstByUserIdOrderByIdDesc(Integer.parseInt(userId))
                .orElseThrow(() -> new ResponseStatusException(HttpStatus.NOT_FOUND, "Ticket not found"));
        return convertToDto(latestTicket);
    }

    public void deleteTicket(String id) {
        ticketRepository.deleteById(id);
    }

    public void updateText(String id, String text) {
        Ticket ticket = ticketRepository.findById(id)
                .orElseThrow(() -> new IllegalArgumentException("Ticket not found"));

        Ticket updatedTicket = Ticket.builder()
                .id(ticket.getId())
                .userId(ticket.getUserId())
                .date(ticket.getDate())
                .time(ticket.getTime())
                .team1English(ticket.getTeam1English())
                .team2English(ticket.getTeam2English())
                .team1Korean(ticket.getTeam1Korean())
                .team2Korean(ticket.getTeam2Korean())
                .imageUrl(ticket.getImageUrl())
                .text(text)
                .createdAt(ticket.getCreatedAt())
                .build();

        ticketRepository.save(updatedTicket);
    }


    private TicketResponseDto convertToDto(Ticket ticket) {
        return TicketResponseDto.builder()
                .id(ticket.getId())
                .userId(ticket.getUserId())
                .date(ticket.getDate())
                .time(ticket.getTime())
                .team1English(ticket.getTeam1English())
                .team2English(ticket.getTeam2English())
                .team1Korean(ticket.getTeam1Korean())
                .team2Korean(ticket.getTeam2Korean())
                .imageUrl(ticket.getImageUrl())
                .text(ticket.getText())
                .build();
    }
}
