package com.bankingplatform.transactionservice.dto;


public class AuditLogRequest {
    private String action;
    private String transactionId;
    private Long accountId;
    private Double amount;
    private String status;

    // Constructors
    public AuditLogRequest() {}

    public AuditLogRequest(String action, String transactionId, Long accountId, Double amount, String status) {
        this.action = action;
        this.transactionId = transactionId;
        this.accountId = accountId;
        this.amount = amount;
        this.status = status;
    }

    // Getters and Setters
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
}