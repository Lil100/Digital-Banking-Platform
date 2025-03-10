package com.emtech.Digital_Banking_User_service.controller;

import com.emtech.Digital_Banking_User_service.dto.LoginRequest;
import com.emtech.Digital_Banking_User_service.dto.RegisterRequest;
import com.emtech.Digital_Banking_User_service.model.User;
import com.emtech.Digital_Banking_User_service.security.JwtTokenProvider;
import com.emtech.Digital_Banking_User_service.service.UserService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.HashMap;
import java.util.Map;
import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@RequiredArgsConstructor
public class UserController {

    private final UserService userService;
    private final JwtTokenProvider jwtTokenProvider;

    @PostMapping("/register")
    public ResponseEntity<Map<String, String>> registerUser(@RequestBody RegisterRequest request) {
        Map<String, String> response = new HashMap<>();

        try {
            User user = userService.registerUser(
                    request.getFullName(),
                    request.getEmail(),
                    request.getPassword(),
                    request.getRole()
            );
            response.put("message", "User registered successfully!");
            response.put("email", user.getEmail());
            return ResponseEntity.ok(response);
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.badRequest().body(response);
        }
    }

    @PostMapping("/login")
    public ResponseEntity<Map<String, Object>> loginUser(@RequestBody LoginRequest request) {
        Map<String, Object> response = new HashMap<>();

        try {
            String user = String.valueOf(userService.authenticateUser(request.getEmail(), request.getPassword()));

            if (user != null) {
                // Generate JWT token with user details
                String token = jwtTokenProvider.generateToken(user, user, user);

                // Prepare response
                response.put("message", "User authenticated successfully");
                response.put("token", token);
                response.put("user", Map.of(
                        "fullName", user,
                        "email", user,
                        "role", user
                ));

                return ResponseEntity.ok(response);
            } else {
                response.put("error", "Invalid credentials");
                return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
            }
        } catch (RuntimeException e) {
            response.put("error", e.getMessage());
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body(response);
        }
    }

}
