package com.newbie.user.domain.user.service;

import com.newbie.user.domain.user.dto.req.UserProfileRequestDto;
import com.newbie.user.domain.user.dto.req.UserRequestDto;
import com.newbie.user.domain.user.dto.res.UserResponseDto;
import com.newbie.user.domain.user.entity.User;
import com.newbie.user.domain.user.exception.UserNotFoundException;
import com.newbie.user.domain.user.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.boot.autoconfigure.transaction.TransactionAutoConfiguration;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;
import software.amazon.awssdk.core.sync.RequestBody;
import software.amazon.awssdk.services.s3.S3Client;
import software.amazon.awssdk.services.s3.model.PutObjectRequest;
import software.amazon.awssdk.services.s3.model.S3Exception;

import java.io.IOException;
import java.util.Arrays;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final S3Client s3Client;
    private final TransactionAutoConfiguration.EnableTransactionManagementConfiguration enableTransactionManagementConfiguration;

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
                .isResigned(requestDto.getIsResigned())
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

        if (userProfileRequestDto.getNickname() != null) user.updateNickname(userProfileRequestDto.getNickname());
        if (userProfileRequestDto.getAddress() != null) user.updateAddress(userProfileRequestDto.getAddress());

        MultipartFile profileImage = userProfileRequestDto.getProfileImage();
        if (profileImage != null && !profileImage.isEmpty()) {
            String fileExtension = getFileExtension(Objects.requireNonNull(profileImage.getOriginalFilename())).toLowerCase();

            // 허용된 확장자 확인
            if (!ALLOWED_FILE_EXTENSIONS.contains(fileExtension)) {
                throw new IllegalArgumentException("허용되지 않은 파일 형식입니다. jpg, jpeg, png 파일만 지원됩니다.");
            }

            String key = "profile/" + user.getId() + "/profile." + fileExtension;
            try {
                // S3 업로드
                s3Client.putObject(PutObjectRequest.builder()
                                .bucket(bucketName)
                                .key(key)
                                .build(),
                        RequestBody.fromInputStream(profileImage.getInputStream(), profileImage.getSize()));

                // 업로드된 이미지 URL 생성
                String imageUrl = getS3ObjectUrl(key);

                // 기존 이미지가 존재하면 URL만 업데이트
                if (user.getProfileImage() != null) {
                    user.updateProfileImage(imageUrl);
                } else {
                    // 처음 업로드인 경우 URL 설정
                    user.updateProfileImage(imageUrl);
                }
            } catch (IOException e) {
                throw new RuntimeException("파일 업로드 중 오류가 발생했습니다.", e);
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

    @Override
<<<<<<< HEAD
    public void updateIsResigned(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);
        user.updateIsResigned(true);
        userRepository.save(user);
=======
    public Integer getFavoriteTeam(Long userId) {
        User user = userRepository.findByUserId(userId)
                .orElseThrow(UserNotFoundException::new);
        return user.getFavoriteTeamId();
>>>>>>> develop/be
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
