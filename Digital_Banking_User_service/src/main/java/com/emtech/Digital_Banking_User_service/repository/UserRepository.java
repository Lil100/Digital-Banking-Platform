package com.emtech.Digital_Banking_User_service.repository;

import com.emtech.Digital_Banking_User_service.model.User;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.Optional;

public interface UserRepository extends JpaRepository<User, Long> {
    Optional<User> findByEmail(String email);

    boolean existsByFullName(String fullName);
}
