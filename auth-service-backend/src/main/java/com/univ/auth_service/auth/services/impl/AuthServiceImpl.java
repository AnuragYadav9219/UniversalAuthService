package com.univ.auth_service.auth.services.impl;

import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

import com.univ.auth_service.auth.config.AppConstants;
import com.univ.auth_service.auth.entities.Role;
import com.univ.auth_service.auth.payload.RegisterRequest;
import com.univ.auth_service.auth.payload.UserDTO;
import com.univ.auth_service.auth.repositories.RoleRepository;
import com.univ.auth_service.auth.services.AuthService;
import com.univ.auth_service.auth.services.UserService;

import lombok.AllArgsConstructor;

@Service
@AllArgsConstructor
public class AuthServiceImpl implements AuthService {

    private final UserService userService;
    private final PasswordEncoder passwordEncoder;

    @Override
    public UserDTO registerUser(RegisterRequest req) {
        UserDTO userDTO = UserDTO.builder()
                .email(req.email())
                .name(req.name())
                .image(req.image())
                .password(passwordEncoder.encode(req.password()))
                .enabled(true)
                .build();

        return userService.createUser(userDTO);
    }
}
