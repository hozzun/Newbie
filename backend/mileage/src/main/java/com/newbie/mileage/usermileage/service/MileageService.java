package com.newbie.mileage.usermileage.service;

import com.newbie.mileage.config.CustomException;
import com.newbie.mileage.config.ErrorCode;
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

        Optional<UserMileage> userMileageOpt = userMileageRepository.findFirstByUserIdOrderByIdDesc(userId);
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

    @RabbitListener(queues = "${rabbitmq.queue.name}")
    public void deductMileage(MileageDeductionDto mileageDeductionDto) {

        int userId = mileageDeductionDto.getUserId();
        double amount = mileageDeductionDto.getAmount();

        UserMileage latestMileage = userMileageRepository.findFirstByUserIdOrderByIdDesc(userId)
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
