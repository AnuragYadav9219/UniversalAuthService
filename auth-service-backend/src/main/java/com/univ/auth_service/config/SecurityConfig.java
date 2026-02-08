package com.univ.auth_service.config;

import java.util.Arrays;
import java.util.List;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.http.HttpStatus;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.config.Customizer;
import org.springframework.security.config.annotation.authentication.configuration.AuthenticationConfiguration;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configurers.AbstractHttpConfigurer;
import org.springframework.security.config.http.SessionCreationPolicy;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.security.web.SecurityFilterChain;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;
import org.springframework.security.web.authentication.UsernamePasswordAuthenticationFilter;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.CorsConfigurationSource;
import org.springframework.web.cors.UrlBasedCorsConfigurationSource;

import com.univ.auth_service.dtos.ApiError;
import com.univ.auth_service.security.JwtAuthenticationFilter;

@Configuration
@EnableWebSecurity
public class SecurityConfig {

        private JwtAuthenticationFilter jwtAuthenticationFilter;
        private AuthenticationSuccessHandler successHandler;

        public SecurityConfig(JwtAuthenticationFilter jwtAuthenticationFilter,
                        AuthenticationSuccessHandler successHandler) {
                this.jwtAuthenticationFilter = jwtAuthenticationFilter;
                this.successHandler = successHandler;
        }

        @Bean
        public SecurityFilterChain securityFilterChain(HttpSecurity http) throws Exception {
                http.csrf(AbstractHttpConfigurer::disable)
                                .cors(Customizer.withDefaults())
                                .logout(AbstractHttpConfigurer::disable)
                                .sessionManagement(sm -> sm.sessionCreationPolicy(SessionCreationPolicy.STATELESS))
                                .authorizeHttpRequests(auth -> auth
                                                .requestMatchers(AppConstants.AUTH_PUBLIC_URLS).permitAll()
                                                .anyRequest().authenticated())

                                .oauth2Login(oauth2 -> oauth2.successHandler(successHandler)
                                                .failureHandler(null))
                                .logout(AbstractHttpConfigurer::disable)

                                .exceptionHandling(ex -> ex
                                                .authenticationEntryPoint((request, response, authException) -> {
                                                        response.setStatus(HttpStatus.UNAUTHORIZED.value());
                                                        response.setContentType("application/json");
                                                        ApiError apiError = ApiError.of(
                                                                        HttpStatus.UNAUTHORIZED.value(),
                                                                        "Unauthorized Access",
                                                                        authException.getMessage(),
                                                                        request.getRequestURI());

                                                        response.getWriter().write("""
                                                                        {
                                                                          "status": %d,
                                                                          "error": "%s",
                                                                          "message": "%s",
                                                                          "path": "%s",
                                                                          "timestamp": "%s"
                                                                        }
                                                                        """.formatted(
                                                                        apiError.status(),
                                                                        apiError.error(),
                                                                        apiError.message(),
                                                                        apiError.path(),
                                                                        apiError.timestamp()));
                                                }))
                                .addFilterBefore(jwtAuthenticationFilter, UsernamePasswordAuthenticationFilter.class);

                return http.build();
        }

        @Bean
        public PasswordEncoder passwordEncoder() {
                return new BCryptPasswordEncoder();
        }

        @Bean
        public AuthenticationManager authenticationManager(
                        AuthenticationConfiguration configuration) throws Exception {
                return configuration.getAuthenticationManager();
        }

        @Bean
        public CorsConfigurationSource corsConfigurationSource(
                        @Value("${app.cors.front-end-url}") String corsUrls) {

                List<String> allowedOrigins = Arrays
                                .stream(corsUrls.split(","))
                                .map(String::trim)
                                .toList();

                CorsConfiguration config = new CorsConfiguration();
                config.setAllowedOrigins(allowedOrigins);
                config.setAllowedMethods(List.of("GET", "POST", "PUT", "DELETE", "OPTIONS", "PATCH", "HEAD"));
                config.setAllowedHeaders(List.of("*"));
                config.setAllowCredentials(true);

                UrlBasedCorsConfigurationSource source = new UrlBasedCorsConfigurationSource();
                source.registerCorsConfiguration("/**", config);

                return source;
        }
}
