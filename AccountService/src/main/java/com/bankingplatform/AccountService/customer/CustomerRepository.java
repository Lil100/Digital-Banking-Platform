package com.bankingplatform.AccountService.customer;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.Optional;

public interface CustomerRepository extends JpaRepository <CustomerEntity, Long> {
    Optional<CustomerEntity> findByEmail(String email);

    // New method to get customer by user id
    Optional<CustomerEntity> findByUserId(Long userId);
}
