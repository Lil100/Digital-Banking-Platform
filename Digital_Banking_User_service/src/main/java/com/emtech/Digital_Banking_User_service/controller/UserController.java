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
import java.util.List;
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
            Optional<User> userOptional = userService.getUserByEmail(request.getEmail());

            if (userOptional.isPresent()) {
                User user = userOptional.get();
                String token = jwtTokenProvider.generateToken(
                        user.getEmail(),
                        user.getFullName(),
                        user.getRole().name()
                );
                response.put("message", "User authenticated successfully");
                response.put("user", Map.of(
                        "userId", user.getId(),
                        "fullName", user.getFullName(),
                        "email", user.getEmail(),
                        "role", user.getRole().name()
                ));
                response.put("token", token);

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

    @GetMapping("/{id}")
    public ResponseEntity<User> getUserById(@PathVariable Long id) {
        return ResponseEntity.of(userService.getUserById(id));
    }

    @GetMapping("/")
    public ResponseEntity<List<User>> getAllUsers() {
        List<User> users = userService.getAllUsers();
        return ResponseEntity.ok(users);
    }

    @PutMapping("/update/{email}")
    public ResponseEntity<User> updateUserByEmail(@PathVariable String email, @RequestBody User user) {
        Optional<User> updatedUser = userService.updateUserByEmail(email, user);
        return updatedUser.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    @DeleteMapping("/delete/{email}")
    public ResponseEntity<Map<String, String>> deleteUserByEmail(@PathVariable String email) {
        boolean deleted = userService.deleteUserByEmail(email);
        Map<String, String> response = new HashMap<>();
        if (deleted) {
            response.put("message", "User deleted successfully");
            return ResponseEntity.ok(response);
        } else {
            response.put("error", "User not found");
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body(response);
        }
    }
}