package com.bankingplatform.transactionservice;

import com.bankingplatform.transactionservice.DTO.AccountDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

@FeignClient(name = "AccountService", url = "http://localhost:8082")
public interface AccountClient {
    @GetMapping("/api/accounts/{accountId}")
    AccountDTO getAccountById(@PathVariable Long accountId);

    @PutMapping("/api/accounts/{accountId}/balance")
    void updateAccountBalance(@PathVariable("accountId") Long accountId, @RequestParam("newBalance") double newBalance);

}
