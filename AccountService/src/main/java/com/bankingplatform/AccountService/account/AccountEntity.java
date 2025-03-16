package com.bankingplatform.AccountService.account;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;
import java.time.LocalDateTime;

@Entity
@Getter
@Setter
public class AccountEntity {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String accountNumber;

    @Column(nullable = false, unique = true) // Ensure email is unique
    private String email;

    @Column(nullable = false)
    private double balance;

    @Column(nullable = false)
    private Long customerId; // Link to customer entity (you can create a relation if needed)

    @Enumerated(EnumType.STRING)
    private AccountStatus status; // Active, Frozen, Closed

    @Column(nullable = false, updatable = false)
    private LocalDateTime createdAt = LocalDateTime.now();
}
