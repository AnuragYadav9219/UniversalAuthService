package com.univ.auth_service.dtos;

public record RegisterRequest(
        String email,
        String name,
        String password,
        String image) {

}
