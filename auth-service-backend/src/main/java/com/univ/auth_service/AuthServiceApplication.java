package com.univ.auth_service;

import java.util.UUID;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

import com.univ.auth_service.auth.config.AppConstants;
import com.univ.auth_service.auth.entities.Role;
import com.univ.auth_service.auth.repositories.RoleRepository;

@SpringBootApplication
public class AuthServiceApplication implements CommandLineRunner {

	@Autowired
	private RoleRepository roleRepository;

	public static void main(String[] args) {
		SpringApplication.run(AuthServiceApplication.class, args);
	}

	@Override
	public void run(String... args) throws Exception {

		// Default User Role
		roleRepository.findByName("ROLE_" + AppConstants.ADMIN_ROLE).ifPresentOrElse(role -> {
			System.out.println("Admin Role Already Exists: " + role.getName());
		}, () -> {
			Role role = new Role();
			role.setName("ROLE_" + AppConstants.ADMIN_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});

		roleRepository.findByName("ROLE_" + AppConstants.GUEST_ROLE).ifPresentOrElse(role -> {
			System.out.println("Guest Role Already Exists: " + role.getName());
		}, () -> {
			Role role = new Role();
			role.setName("ROLE_" + AppConstants.GUEST_ROLE);
			role.setId(UUID.randomUUID());
			roleRepository.save(role);
		});
	}

}
