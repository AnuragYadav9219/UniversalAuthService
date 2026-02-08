package com.univ.auth_service.security;

import java.io.IOException;
import java.time.Instant;
import java.util.UUID;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.security.core.Authentication;
import org.springframework.security.oauth2.client.authentication.OAuth2AuthenticationToken;
import org.springframework.security.oauth2.core.user.OAuth2User;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.stereotype.Component;

import com.univ.auth_service.entities.Provider;
import com.univ.auth_service.entities.RefreshToken;
import com.univ.auth_service.entities.User;
import com.univ.auth_service.repositories.RefreshTokenRepository;
import com.univ.auth_service.repositories.UserRepository;

import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;
import jakarta.transaction.Transactional;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;

@Component
@RequiredArgsConstructor
@Slf4j
public class OAuth2SuccessHandler implements AuthenticationSuccessHandler {

    private final UserRepository userRepository;
    private final JwtService jwtService;
    private final CookieService cookieService;
    private final RefreshTokenRepository refreshTokenRepository;

    @Value("${app.auth.frontend.success-redirect}")
    private String frontendSuccessUrl;

    @Override
    @Transactional
    public void onAuthenticationSuccess(
            HttpServletRequest request,
            HttpServletResponse response,
            Authentication authentication) throws IOException {

        log.info("Successful Authentication");
        log.info(authentication.toString());

        OAuth2User oAuth2User = (OAuth2User) authentication.getPrincipal();

        String registrationId = (authentication instanceof OAuth2AuthenticationToken token)
                ? token.getAuthorizedClientRegistrationId()
                : "unknown";

        log.info("registrationId: {}", registrationId);
        log.info("user attributes: {}", oAuth2User.getAttributes());

        User user;

        switch (registrationId) {

            case "google" -> {
                String googleId = (String) oAuth2User.getAttributes().get("sub");
                String email = (String) oAuth2User.getAttributes().get("email");
                String name = (String) oAuth2User.getAttributes().get("name");
                String picture = (String) oAuth2User.getAttributes().get("picture");

                user = userRepository.findByEmail(email)
                        .orElseGet(() -> userRepository.save(
                                User.builder()
                                        .email(email)
                                        .name(name)
                                        .image(picture)
                                        .enable(true)
                                        .provider(Provider.GOOGLE)
                                        .providerId(googleId)
                                        .build()));
            }

            case "github" -> {
                String githubId = String.valueOf(oAuth2User.getAttributes().get("id"));
                String name = (String) oAuth2User.getAttributes().get("login");
                String rawEmail = (String) oAuth2User.getAttributes().get("email");
                String image = (String) oAuth2User.getAttributes().get("avatar_url");

                final String email = (rawEmail == null || rawEmail.isBlank())
                        ? name + "@github.com"
                        : rawEmail;

                user = userRepository.findByEmail(email)
                        .orElseGet(() -> userRepository.save(
                                User.builder()
                                        .email(email)
                                        .name(name)
                                        .image(image)
                                        .enable(true)
                                        .provider(Provider.GITHUB)
                                        .providerId(githubId)
                                        .build()));
            }

            default -> throw new RuntimeException("Invalid OAuth2 provider");
        }

        // ---------- Refresh Token ----------
        String jti = UUID.randomUUID().toString();

        RefreshToken refreshTokenOb = RefreshToken.builder()
                .jti(jti)
                .user(user)
                .revoked(false)
                .createdAt(Instant.now())
                .expiresAt(Instant.now().plusSeconds(jwtService.getRefreshTtlSeconds()))
                .build();

        refreshTokenRepository.save(refreshTokenOb);

        String refreshToken = jwtService.generateRefreshToken(user, jti);

        cookieService.attachRefreshCookie(
                response,
                refreshToken,
                (int) jwtService.getRefreshTtlSeconds());

        response.sendRedirect(frontendSuccessUrl);
    }
}
