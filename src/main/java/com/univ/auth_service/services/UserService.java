package com.univ.auth_service.services;

import com.univ.auth_service.dtos.UserDTO;

public interface UserService {

    // Create User
    UserDTO createUser(UserDTO userDTO);

    // Get User by Email
    UserDTO getUserByEmail(String email);

    // Update User
    UserDTO updateUser(UserDTO userDTO, String userId);

    // Delete User
    void deleteUser(String userId);

    // Get User by Id
    UserDTO getUserById(String userId);

    // Get all Users
    Iterable<UserDTO> getAllUsers();
}
