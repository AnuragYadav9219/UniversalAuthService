package com.univ.auth_service.auth.payload;

public record RegisterRequest(
        String email,
        String name,
        String password,
        String image) {

}
