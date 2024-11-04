package com.newbie.mileage.config;

import lombok.Getter;
import lombok.RequiredArgsConstructor;

@Getter
@RequiredArgsConstructor
public enum ErrorCode {
    EMPTY_FILE_EXCEPTION("S3-001", "The file is empty or filename is missing."),
    IO_EXCEPTION_ON_IMAGE_UPLOAD("S3-002", "I/O error occurred while uploading the image."),
    NO_FILE_EXTENTION("S3-003", "No file extension found in the filename."),
    INVALID_FILE_EXTENTION("S3-004", "File extension is not supported."),
    PUT_OBJECT_EXCEPTION("S3-005", "Error occurred while putting object to S3."),
    IO_EXCEPTION_ON_IMAGE_DELETE("S3-006", "I/O error occurred while deleting the image from S3."),
    INSUFFICIENT_MILEAGE("MILEAGE-001", "Insufficient mileage to complete the purchase."),
    MILEAGE_CHECK_FAILED("MILEAGE-002", "Failed to verify mileage."),
    INVALID_CARD_ID("CARD-001", "Invalid card ID."),
    USER_NOT_FOUND("USER-002", "user not found.");

    private final String code;
    private final String message;
}
