package com.newbie.mileage.usermileage.repository;

import com.newbie.mileage.usermileage.entity.UserMileage;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;


@Repository
public interface UserMileageRepository extends MongoRepository<UserMileage, String> {
    Optional<UserMileage> findFirstByUserIdOrderByIdDesc(int userId);
}
