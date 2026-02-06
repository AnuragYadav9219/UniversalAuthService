package com.univ.auth_service.config;

public class AppConstants {

    public static final String[] AUTH_PUBLIC_URLS = {
            "/error",
            "/api/v1/auth/**",
            "/v3/api-docs/**",
            "/swagger-ui.html",
            "/swagger-ui/**"
    };
}
