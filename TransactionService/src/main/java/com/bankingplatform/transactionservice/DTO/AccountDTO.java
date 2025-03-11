package com.bankingplatform.transactionservice.DTO;

import lombok.Data;
import lombok.Getter;
import lombok.Setter;

import java.time.LocalDateTime;

@Data
@Getter
@Setter
public class AccountDTO {
    private Long id;
    private String accountNumber;
    private double balance;
    private Long customerId;
    private AccountStatus status;
    private LocalDateTime createdAt;
}
