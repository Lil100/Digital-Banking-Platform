package com.emtech.Digital_Banking_User_service.service;

import com.emtech.Digital_Banking_User_service.dto.CustomerRequest;
import com.emtech.Digital_Banking_User_service.model.User;
import com.emtech.Digital_Banking_User_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;

import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
@Slf4j
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;
    private final RestTemplate restTemplate;

    public User registerUser(String fullName, String email, String password, String role) {
        if (userRepository.existsByFullName(fullName)) {
            throw new IllegalStateException("User already exists");
        }

        // Convert role string to Enum safely
        User.Role userRole = Optional.ofNullable(role)
                .map(String::toUpperCase)
                .map(User.Role::valueOf)
                .orElseThrow(() -> new IllegalArgumentException("Invalid role: " + role));

        // Hash password before storing
        String encodedPassword = passwordEncoder.encode(password);

        User user = User.builder()
                .fullName(fullName)
                .email(email)
                .password(encodedPassword)
                .role(userRole)
                .build();

        // Save user
        User savedUser = userRepository.save(user);
        log.info("User registered successfully: {}", savedUser.getEmail());

        // Send CustomerRequest to Account Service
        sendCustomerRequest(savedUser);

        return savedUser;
    }

    private void sendCustomerRequest(User savedUser) {
        try {
            String accountServiceUrl = "http://ACCOUNT-SERVICE/api/customers";
            CustomerRequest customerRequest = new CustomerRequest(
                    savedUser.getId(),
                    savedUser.getFullName(),
                    savedUser.getEmail()
            );

            restTemplate.postForObject(accountServiceUrl, customerRequest, Void.class);
            log.info("Customer request sent to Account Service for user: {}", savedUser.getEmail());
        } catch (Exception e) {
            log.error("Failed to send Customer Request: {}", e.getMessage());
        }
    }

    public boolean authenticateUser(String email, String password) {
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            log.warn("Authentication failed: User with email {} not found", email);
            return false; // User does not exist
        }

        User user = userOptional.get();

        if (!passwordEncoder.matches(password, user.getPassword())) {
            log.warn("Authentication failed: Incorrect password for email {}", email);
            return false; // Incorrect password
        }

        log.info("User {} authenticated successfully", email);
        return true; // Authentication successful
    }


    public Optional<User> getUserById(Long id) {
        return userRepository.findById(id);
    }

    public Optional<User> getUserByEmail(String email) {
        return userRepository.findByEmail(email);
    }

    public List<User> getAllUsers() {
        return userRepository.findAll();
    }

    public Optional<User> updateUserByEmail(String email, User updatedUser) {
        return userRepository.findByEmail(email).map(existingUser -> {
            existingUser.setFullName(updatedUser.getFullName());

            // Ensure password is hashed before updating
            if (!updatedUser.getPassword().isEmpty()) {
                existingUser.setPassword(passwordEncoder.encode(updatedUser.getPassword()));
            }

            existingUser.setRole(updatedUser.getRole());
            return userRepository.save(existingUser);
        });
    }

    public boolean deleteUserByEmail(String email) {
        return userRepository.findByEmail(email).map(user -> {
            userRepository.delete(user);
            log.info("User deleted successfully: {}", email);
            return true;
        }).orElse(false);
    }
}
