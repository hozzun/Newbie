package com.newbie.user.domain.user.dto.req;

import lombok.Builder;
import lombok.Data;
import org.springframework.web.multipart.MultipartFile;

@Builder
@Data
public class UserProfileRequestDto {

    private String nickname;
    private String address;
    private MultipartFile profileImage;
}
