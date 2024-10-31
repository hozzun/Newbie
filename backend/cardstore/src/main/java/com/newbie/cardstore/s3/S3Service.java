package com.newbie.cardstore.s3;


import com.amazonaws.services.s3.AmazonS3;
import com.amazonaws.services.s3.model.ObjectMetadata;
import com.newbie.cardstore.card.entity.PlayerCard;
import com.newbie.cardstore.card.repository.PlayerCardRepository;
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
    private final PlayerCardRepository playerCardRepository;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;


    /**
     * S3에 선수 카드 업로드 및 DB에 imageUrl 저장
     * @param multipartFile 선수 포토 카드 파일
     * @param name 선수 이름
     * @param team 선수 소속 팀
     * @param price 카드 가격
     * @return S3 imageURL
     * @throws IOException
     */
    public String saveFile(MultipartFile multipartFile, String name, String no, String team, String position, double price) throws IOException {
        String originalFilename = multipartFile.getOriginalFilename();

        ObjectMetadata metadata = new ObjectMetadata();
        metadata.setContentLength(multipartFile.getSize());
        metadata.setContentType(multipartFile.getContentType());

        amazonS3.putObject(bucket, originalFilename, multipartFile.getInputStream(), metadata);
        String fileUrl = amazonS3.getUrl(bucket, originalFilename).toString();

        SimpleDateFormat dateFormat = new SimpleDateFormat("yyyy-MM-dd");
        String createdAt = dateFormat.format(new Date());

        PlayerCard playerCard = PlayerCard.builder()
                .imageUrl(fileUrl)
                .name(name)
                .position(position)
                .team(team)
                .no(no)
                .price(price)
                .createdAt(createdAt)
                .salesCount(0)
                .build();

        playerCardRepository.save(playerCard);
        return fileUrl;
    }
}