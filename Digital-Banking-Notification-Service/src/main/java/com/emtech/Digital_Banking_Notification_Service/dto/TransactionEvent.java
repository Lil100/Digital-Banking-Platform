package com.emtech.Digital_Banking_Notification_Service.dto;


import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class TransactionEvent {
    private String transactionId;
    private String accountId;
    private String transactionType; // DEPOSIT, WITHDRAWAL, TRANSFER
    private double amount;
    private String currency;
    private String timestamp;
    private String email;
    private String phoneNumber;
}
