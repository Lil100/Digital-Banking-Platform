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

    @Column(nullable = false)
    private double balance;

    @Column(nullable = false)
    private Long customerId; // Link to customer entity (you can create a relation if needed)

    @Enumerated(EnumType.STRING)
    private AccountStatus status; // Active, Frozen, Closed

    @Column(nullable = false)
    private LocalDateTime createdAt = LocalDateTime.now();


}
