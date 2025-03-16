package com.bankingplatform.transactionservice.client;


import com.bankingplatform.transactionservice.dto.AccountDTO;
import com.bankingplatform.transactionservice.dto.AuditLogRequest;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.*;

@FeignClient(name = "audit-logging-service", url = "http://localhost:9091") // Audit Logging Service URL
public interface AuditLoggingClient {
    @GetMapping("/api/accounts/{accountId}")
    AccountDTO getAccountById(@PathVariable Long accountId);

    // Log a transaction in the audit service
    @PostMapping("/api/audit/logs")
    void logTransaction(@RequestBody AuditLogRequest request);

    @PutMapping("/api/accounts/{accountId}/balance")
    void updateAccountBalance(@PathVariable("accountId") Long accountId, @RequestParam("newBalance") double newBalance);

}
