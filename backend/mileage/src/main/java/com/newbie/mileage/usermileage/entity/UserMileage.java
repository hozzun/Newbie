package com.newbie.mileage.usermileage.entity;


import lombok.Builder;
import lombok.Data;
import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.Document;

@Builder
@Data
@Document(collection = "user_mileage")
public class UserMileage {

    @Id
    private String id;
    private Integer userId;
    private double mileage;
    private String createdAt;
    private String reason;
    private double change;
}
