package com.newbie.mypage.s3;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.newbie.mypage.watch_game.entity.Ticket;
import com.newbie.mypage.watch_game.repository.TicketRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import java.io.IOException;
import java.text.SimpleDateFormat;
import java.util.Date;


@Slf4j
@RequiredArgsConstructor
@Service
public class S3Service {

    private final AmazonS3 amazonS3;
    private final TicketRepository ticketRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public Ticket saveFile(MultipartFile multipartFile, int userId, String date, String team1English, String team2English,
                           String team1Korean, String team2Korean) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
        String fileUrl = amazonS3.getUrl(bucket, originalFilename).toString();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String createdAt = dateFormat.format(new Date());

        Ticket ticket = Ticket.builder()
                .userId(userId)
                .date(date)
                .team1English(team1English)
                .team2English(team2English)
                .team1Korean(team1Korean)
                .team2Korean(team2Korean)
                .imageUrl(fileUrl)
                .createdAt(createdAt)
                .build();

        return ticketRepository.save(ticket);
    }
}