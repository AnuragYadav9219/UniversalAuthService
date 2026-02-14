package com.univ.auth_service.auth.services.impl;

import java.time.Instant;
import java.util.UUID;

import org.modelmapper.ModelMapper;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.univ.auth_service.auth.config.AppConstants;
import com.univ.auth_service.auth.entities.Provider;
import com.univ.auth_service.auth.entities.Role;
import com.univ.auth_service.auth.entities.User;
import com.univ.auth_service.auth.helpers.UserHelper;
import com.univ.auth_service.auth.payload.UserDTO;
import com.univ.auth_service.auth.repositories.RoleRepository;
import com.univ.auth_service.auth.repositories.UserRepository;
import com.univ.auth_service.auth.services.UserService;
import com.univ.auth_service.exception.ResourceNotFoundException;

import lombok.RequiredArgsConstructor;

@Service
@RequiredArgsConstructor
public class UserServiceImpl implements UserService {

    private final UserRepository userRepository;
    private final ModelMapper modelMapper;
    private final RoleRepository roleRepository;

    @Override
    @Transactional
    public UserDTO createUser(UserDTO userDTO) {
        if (userDTO.getEmail() == null || userDTO.getEmail().isBlank()) {
            throw new IllegalArgumentException("Email is required");
        }
        if (userRepository.existsByEmail(userDTO.getEmail())) {
            throw new IllegalArgumentException("User with given email already exists");
        }
        User user = modelMapper.map(userDTO, User.class);
        user.setProvider(userDTO.getProvider() != null ? userDTO.getProvider() : Provider.LOCAL);

        if (user.getRoles() == null) {
            user.setRoles(new java.util.HashSet<>());
        }

        System.out.println("Roles before add: " + user.getRoles());

        // Assign Role here to user for Authorization
        Role role = roleRepository
                .findByName("ROLE_" + AppConstants.GUEST_ROLE)
                .orElseThrow(() -> new ResourceNotFoundException("Default role not found"));

        user.getRoles().add(role);

        User savedUser = userRepository.save(user);
        return modelMapper.map(savedUser, UserDTO.class);
    }

    @Override
    public UserDTO getUserByEmail(String email) {
        User user = userRepository
                .findByEmail(email)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given email id."));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    public UserDTO updateUser(UserDTO userDTO, String userId) {
        UUID uId = UserHelper.parseUUId(userId);
        User existingUser = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given id."));
        // No change in email id for this project
        if (userDTO.getName() != null)
            existingUser.setName(userDTO.getName());
        if (userDTO.getImage() != null)
            existingUser.setImage(userDTO.getImage());
        if (userDTO.getProvider() != null)
            existingUser.setProvider(userDTO.getProvider());

        // TODO: change password updation logic
        if (userDTO.getPassword() != null)
            existingUser.setPassword(userDTO.getPassword());
        existingUser.setEnabled(userDTO.isEnabled());
        existingUser.setUpdatedAt(Instant.now());
        User updatedUser = userRepository.save(existingUser);
        return modelMapper.map(updatedUser, UserDTO.class);
    }

    @Override
    public void deleteUser(String userId) {
        UUID uId = UserHelper.parseUUId(userId);

        User user = userRepository.findById(uId)
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        userRepository.delete(user);
    }

    @Override
    public UserDTO getUserById(String userId) {
        User user = userRepository.findById(UserHelper.parseUUId(userId))
                .orElseThrow(() -> new ResourceNotFoundException("User not found with given id"));
        return modelMapper.map(user, UserDTO.class);
    }

    @Override
    @Transactional(readOnly = true)
    public Iterable<UserDTO> getAllUsers() {
        return userRepository
                .findAll()
                .stream()
                .map(user -> modelMapper.map(user, UserDTO.class))
                .toList();
    }

}
