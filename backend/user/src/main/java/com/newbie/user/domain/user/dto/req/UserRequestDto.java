package com.newbie.user.domain.user.dto.req;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import software.amazon.awssdk.services.s3.endpoints.internal.Value;

@Builder
@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserRequestDto {

    private Long userId;
    private String email;
    private String nickname;
    private String address;
    private Boolean isResigned;
}
