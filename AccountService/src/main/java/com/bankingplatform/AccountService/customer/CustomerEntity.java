package com.bankingplatform.AccountService.customer;

import jakarta.persistence.*;
import lombok.Getter;
import lombok.Setter;

@Entity
@Getter
@Setter
public class CustomerEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String name;
    private String email;
    private String phone;
    private String address;

    // New field: store the associated user id (foreign key)
    @Column(name = "user_id", unique = true)
    private Long userId;
}
