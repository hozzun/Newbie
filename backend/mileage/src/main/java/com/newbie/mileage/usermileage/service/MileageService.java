package com.newbie.mileage.usermileage.service;

import com.newbie.mileage.config.CustomException;
import com.newbie.mileage.config.ErrorCode;
import com.newbie.mileage.usermileage.dto.MileageAddDto;
import com.newbie.mileage.usermileage.dto.MileageDeductionDto;
import com.newbie.mileage.usermileage.entity.UserMileage;
import com.newbie.mileage.usermileage.repository.UserMileageRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Service;

import javax.management.Query;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class MileageService {

    private final UserMileageRepository userMileageRepository;

    public boolean checkMileage(int userId, double price) {
        log.info("Checking mileage for userId: {} with required price: {}", userId, price);

        Optional<UserMileage> userMileageOpt = userMileageRepository.findFirstByUserIdOrderByCreatedAtDesc(userId);
        if (userMileageOpt.isPresent()) {
            UserMileage userMileage = userMileageOpt.get();
            log.info("유저의 id : {}, 유저의 현재 마일리지 : {}", userId, userMileage.getMileage());

            boolean hasSufficientMileage = userMileage.getMileage() >= price;
            if (hasSufficientMileage) {
            } else {
                log.warn("마일리지가 부족합니다: {} - required: {}, available: {}", userId, price, userMileage.getMileage());
            }
            return hasSufficientMileage;
        } else {
            log.warn("마일리지가 없습니다: {}", userId);
            return false;
        }
    }

    @RabbitListener(queues = "${rabbitmq.board.queue.name}")
    public void addMileage(MileageAddDto mileageUpdateDto) {
        Integer userId = mileageUpdateDto.getUserId();
        double amount = mileageUpdateDto.getAmount();
        String reason = mileageUpdateDto.getReason();

        log.info("Received mileage addition request: userId={}, amount={}, reason={}", userId, amount, reason);

        UserMileage latestMileage = userMileageRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElse(UserMileage.builder()
                        .userId(userId)
                        .mileage(0)
                        .createdAt(String.valueOf(System.currentTimeMillis()))
                        .build());

        UserMileage updatedMileage = UserMileage.builder()
                .userId(userId)
                .mileage(latestMileage.getMileage() + amount)
                .change(amount)
                .reason(reason)
                .createdAt(String.valueOf(System.currentTimeMillis()))
                .build();

        userMileageRepository.save(updatedMileage);

        log.info("Mileage addition completed: userId={}, addedAmount={}, totalMileage={}",
                userId, amount, updatedMileage.getMileage());
    }

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void deductMileage(MileageDeductionDto mileageDeductionDto) {

        int userId = mileageDeductionDto.getUserId();
        double amount = mileageDeductionDto.getAmount();

        UserMileage latestMileage = userMileageRepository.findFirstByUserIdOrderByCreatedAtDesc(userId)
                .orElseThrow(() -> new CustomException(ErrorCode.USER_NOT_FOUND));

        if (latestMileage.getMileage() < amount) {
            throw new CustomException(ErrorCode.INSUFFICIENT_MILEAGE);
        }

        String formattedDate = new SimpleDateFormat("yyyy-MM-dd").format(new Date());

        UserMileage updatedMileage = UserMileage.builder()
                .userId(userId)
                .mileage(latestMileage.getMileage() - amount)
                .createdAt(formattedDate)
                .change(-amount)
                .reason(mileageDeductionDto.getReason())
                .build();

        userMileageRepository.save(updatedMileage);
    }
}
