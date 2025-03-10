package com.emtech.Digital_Banking_User_service.service;

import com.emtech.Digital_Banking_User_service.model.User;
import com.emtech.Digital_Banking_User_service.repository.UserRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import java.util.Optional;


@Service
@RequiredArgsConstructor
public class UserService {

    private final UserRepository userRepository;
    private final PasswordEncoder passwordEncoder;

    public User registerUser(String fullName, String email, String password, String role) {
        if (userRepository.existsByFullName(fullName)) {
            throw new RuntimeException("User already exists");
        }

        // ✅ Convert role String to Enum
        User.Role userRole;
        try {
            userRole = User.Role.valueOf(role.toUpperCase());
        } catch (IllegalArgumentException e) {
            throw new RuntimeException("Invalid role: " + role);
        }

        User user = User.builder()
                .fullName(fullName)
                .password(passwordEncoder.encode(password))
                .email(email)
                .role(userRole)  // ✅ Dynamically assign role
                .build();

        return userRepository.save(user);
    }

    public boolean authenticateUser(String email, String password) {
        // Find user by email
        Optional<User> userOptional = userRepository.findByEmail(email);

        if (userOptional.isEmpty()) {
            return false; // User not found
        }

        User user = userOptional.get();

        // Check if the password is correct
        if (!passwordEncoder.matches(password, user.getPassword())) {
            return false; // Incorrect password
        }

        return true; // Successful authentication
    }
}
