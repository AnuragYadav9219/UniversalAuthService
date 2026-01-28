package com.univ.auth_service.services;

import com.univ.auth_service.dtos.UserDTO;

public interface AuthService {
    UserDTO registerUser(UserDTO userDTO);

    // Login User
}
