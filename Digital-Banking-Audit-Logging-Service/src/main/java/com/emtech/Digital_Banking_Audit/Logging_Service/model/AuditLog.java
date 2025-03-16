package com.emtech.Digital_Banking_Audit.Logging_Service.model;


import jakarta.persistence.*;
import lombok.*;

import java.time.LocalDateTime;

@Data
@AllArgsConstructor
@Builder
@Entity
@Table(name = "audit_logs")
public class AuditLog {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    private String action;
    private String userEmail;
    private String transactionId;
    private String details;
    private String ipAddress;
    private Long accountId;
    private Double amount;
    private String status;
    private LocalDateTime timestamp;

    // Constructors
    public AuditLog() {}

    public AuditLog(String action, String transactionId, Long accountId, Double amount, String status, LocalDateTime timestamp) {
        this.action = action;
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.amount = amount;
        this.status = status;
        this.timestamp = timestamp;
    }

    // Getters and Setters
    public Long getId() { return id; }
    public void setId(Long id) { this.id = id; }

    public String getAction() { return action; }
    public void setAction(String action) { this.action = action; }

    public String getTransactionId() { return transactionId; }
    public void setTransactionId(String transactionId) { this.transactionId = transactionId; }

    public Long getAccountId() { return accountId; }
    public void setAccountId(Long accountId) { this.accountId = accountId; }

    public Double getAmount() { return amount; }
    public void setAmount(Double amount) { this.amount = amount; }

    public String getStatus() { return status; }
    public void setStatus(String status) { this.status = status; }

    public LocalDateTime getTimestamp() { return timestamp; }
    public void setTimestamp(LocalDateTime timestamp) { this.timestamp = timestamp; }
}
