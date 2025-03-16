package com.bankingplatform.AccountService.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/acc/accounts")
public class AccountController {

    @Autowired
    private AccountService accountService;

    // Create new account
    @PostMapping("/create")
    public ResponseEntity<AccountEntity> createAccount(@RequestBody AccountEntity account) {
        AccountEntity newAccount = accountService.createAccount(account);
        return ResponseEntity.ok(newAccount);
    }
    @PutMapping("/{accountId}/balance")
    public void updateAccountBalance(@PathVariable Long accountId, @RequestParam double newBalance) {
        accountService.updateBalance(accountId, newBalance);}

    @GetMapping("/{accountId}")
    public ResponseEntity<AccountEntity> getAccountById(@PathVariable Long accountId) {
        AccountEntity account = accountService.getAccountById(accountId);
        if (account != null) {
            return ResponseEntity.ok(account);
        } else {
            return ResponseEntity.notFound().build();
        }
    }

    // Get accounts by customerId
    @GetMapping("/customer/{customerId}")
    public ResponseEntity<List<AccountEntity>> getAccountsByCustomerId(@PathVariable Long customerId) {
        List<AccountEntity> accounts = accountService.getAccountsByCustomerId(customerId);
        if (!accounts.isEmpty()) {
            return ResponseEntity.ok(accounts);
        } else {
            return ResponseEntity.notFound().build();
        }
    }



    // Get all accounts
    @GetMapping("/all")
    public ResponseEntity<List<AccountEntity>> getAllAccounts() {
        List<AccountEntity> accounts = accountService.getAllAccounts();
        return ResponseEntity.ok(accounts);
    }

    // Get account by account number
    @GetMapping("/number/{accountNumber}")
    public ResponseEntity<AccountEntity> getAccountByAccountNumber(@PathVariable String accountNumber) {
        Optional<AccountEntity> account = accountService.getAccountByAccountNumber(accountNumber);
        return account.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }

    // Get accounts by status
    @GetMapping("/status/{status}")
    public ResponseEntity<List<AccountEntity>> getAccountsByStatus(@PathVariable AccountStatus status) {
        List<AccountEntity> accounts = accountService.getAccountsByStatus(status);
        return ResponseEntity.ok(accounts);
    }

    @GetMapping("/email/{email}")
    public ResponseEntity<AccountEntity> getAccountByEmail(@PathVariable String email) {
        Optional<AccountEntity> account = accountService.getAccountByEmail(email);
        return account.map(ResponseEntity::ok)
                .orElseGet(() -> ResponseEntity.notFound().build());
    }


    // Freeze account
    @PutMapping("/{id}/freeze")
    public ResponseEntity<AccountEntity> freezeAccount(@PathVariable Long id) {
        AccountEntity updatedAccount = accountService.freezeAccount(id);
        return ResponseEntity.ok(updatedAccount);
    }

    // Unfreeze account
    @PutMapping("/{id}/unfreeze")
    public ResponseEntity<AccountEntity> unfreezeAccount(@PathVariable Long id) {
        AccountEntity updatedAccount = accountService.unfreezeAccount(id);
        return ResponseEntity.ok(updatedAccount);
    }

    // Close account
    @DeleteMapping("/{id}/close")
    public ResponseEntity<Void> closeAccount(@PathVariable Long id) {
        accountService.closeAccount(id);
        return ResponseEntity.noContent().build();
    }
}
