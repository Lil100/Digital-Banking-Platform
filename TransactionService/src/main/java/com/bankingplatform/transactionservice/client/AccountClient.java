package com.bankingplatform.transactionservice.client;

import com.bankingplatform.transactionservice.dto.AccountDTO;
import org.springframework.cloud.openfeign.FeignClient;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.PutMapping;
import org.springframework.web.bind.annotation.RequestParam;

import java.util.List;
@FeignClient(name = "account-service", url = "http://localhost:9083")
public interface AccountClient {

    @GetMapping("/api/accounts/{id}")
    AccountDTO getAccountById(@PathVariable("id") Long id);

    @GetMapping("/api/accounts")
    List<AccountDTO> getAllAccounts();

    @PutMapping("/api/accounts/{id}/balance")
    void updateAccountBalance(@PathVariable("id") Long accountId, @RequestParam("amount") double amount);
}

