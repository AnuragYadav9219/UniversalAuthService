package com.univ.auth_service.auth.payload;

public record LoginRequest(
        String email,
        String password) {

}
