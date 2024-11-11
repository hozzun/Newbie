package com.newbie.user.domain.user.service;

import com.newbie.user.domain.user.dto.req.UserProfileRequestDto;
import com.newbie.user.domain.user.dto.req.UserRequestDto;
import com.newbie.user.domain.user.dto.res.UserResponseDto;
import com.newbie.user.domain.user.entity.User;
import com.newbie.user.domain.user.exception.UserNotFoundException;
import com.newbie.user.domain.user.repository.UserRepository;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3Client s3Client;

    @Value("${spring.cloud.aws.s3.bucket}")
    private String bucketName;

    private static final List<String> ALLOWED_FILE_EXTENSIONS = Arrays.asList("jpg", "jpeg", "png");
    private static final String DEFAULT_PROFILE_IMAGE = "profile/default/default.jpg";

    @Override
    public void saveUserProfile(UserRequestDto requestDto) {
        String defaultImageUrl = getS3ObjectUrl(DEFAULT_PROFILE_IMAGE);

        User user = User.builder()
                .userId(requestDto.getUserId())
                .email(requestDto.getEmail())
                .nickname(requestDto.getNickname())
                .address(requestDto.getAddress())
                .profileImage(defaultImageUrl)
                .build();

        userRepository.save(user);
    }

    @Override
    public UserResponseDto getUserProfile(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);
        return convertToDto(user);
    }

    public void updateUserProfile(Long userId, UserProfileRequestDto userProfileRequestDto) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);

        // 닉네임과 주소 업데이트
        if (userProfileRequestDto.getNickname() != null) user.updateNickname(userProfileRequestDto.getNickname());
        if (userProfileRequestDto.getAddress() != null) user.updateAddress(userProfileRequestDto.getAddress());

        // 프로필 이미지 업데이트
        if (userProfileRequestDto.getProfileImage() != null && !userProfileRequestDto.getProfileImage().isEmpty()) {
            String originalFilename = userProfileRequestDto.getProfileImage().getOriginalFilename();

            if (originalFilename == null || originalFilename.isEmpty()) {
                throw new IllegalArgumentException("파일 이름이 유효하지 않습니다.");
            }

            String fileExtension = getFileExtension(originalFilename).toLowerCase();

            if (!ALLOWED_FILE_EXTENSIONS.contains(fileExtension)) {
                throw new IllegalArgumentException("허용되지 않은 파일 형식입니다. jpg 또는 png 파일을 업로드해주세요.");
            }

            String key = "profile/" + user.getUserId() + "/" + originalFilename;
            try {
                s3Client.putObject(PutObjectRequest.builder()
                                .bucket(bucketName)
                                .key(key)
                                .build(),
                        RequestBody.fromInputStream(userProfileRequestDto.getProfileImage().getInputStream(), userProfileRequestDto.getProfileImage().getSize()));

                String imageUrl = getS3ObjectUrl(key);
                user.updateProfileImage(imageUrl);
            } catch (IOException | S3Exception e) {
                throw new RuntimeException("파일 업로드 중 오류 발생", e);
            }
        }
        userRepository.save(user);
    }

    @Override
    public void updateFavoriteTeam(Long userId, Integer teamId) {
        if (teamId < 1 || teamId > 10) {
            throw new IllegalArgumentException("favoriteTeamId는 1에서 10 사이의 값이어야 합니다.");
        }

        User user = userRepository.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);
        user.updateFavoriteTeamId(teamId);
        userRepository.save(user);
    }

    private String getFileExtension(String fileName) {
        return fileName.substring(fileName.lastIndexOf(".") + 1);
    }

    private String getS3ObjectUrl(String key) {
        return s3Client.utilities().getUrl(builder -> builder.bucket(bucketName).key(key)).toExternalForm();
    }

    private UserResponseDto convertToDto(User user) {
        return UserResponseDto.builder()
                .email(user.getEmail())
                .nickname(user.getNickname())
                .address(user.getAddress())
                .profileImage(user.getProfileImage())
                .favoriteTeamId(user.getFavoriteTeamId())
                .build();
    }
}
