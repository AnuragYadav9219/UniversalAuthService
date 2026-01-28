package com.univ.auth_service.dtos;

public record ErrorResponse(
        String message,
        String status,
        int statusCode) {

}
