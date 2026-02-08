package com.univ.auth_service.dtos;

import java.time.OffsetDateTime;
import java.time.ZoneOffset;

public record ApiError(
        int status,
        String error,
        String message,
        String path,
        OffsetDateTime timestamp) {

    // Normal error with timestamp
    public static ApiError of(int status, String error, String message, String path) {
        return new ApiError(
                status,
                error,
                message,
                path,
                OffsetDateTime.now(ZoneOffset.UTC));
    }

    // Error without timestamp
    public static ApiError withoutTimestamp(int status, String error, String message, String path) {
        return new ApiError(
                status,
                error,
                message,
                path,
                null);
    }
}
