package com.univ.auth_service.auth.services;

import com.univ.auth_service.auth.payload.RegisterRequest;
import com.univ.auth_service.auth.payload.UserDTO;

public interface AuthService {
    UserDTO registerUser(RegisterRequest req);

    // Login User
}
