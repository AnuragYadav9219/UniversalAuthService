package com.univ.auth_service.dtos;

public record LoginRequest(
        String email,
        String password) {

}
