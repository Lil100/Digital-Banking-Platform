package com.bankingplatform.AccountService.account;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class AccountService {

    @Autowired
    private AccountRepository accountRepository;


    // Create new account
    public AccountEntity createAccount(AccountEntity accountEntity) {
        return accountRepository.save(accountEntity);
    }

    public AccountEntity getAccountById(Long accountId) {
        Optional<AccountEntity> account = accountRepository.findById(accountId);
        return account.orElse(null);
    }
    public void updateBalance(Long accountId, double newBalance) {
        AccountEntity account = accountRepository.findById(accountId)
                .orElseThrow(() -> new IllegalStateException("Account not found"));
        account.setBalance(newBalance);
        accountRepository.save(account);
    }

    // Get account by account number
    public Optional<AccountEntity> getAccountByAccountNumber(String accountNumber) {
        return accountRepository.findByAccountNumber(accountNumber);
    }

    // Get all accounts
    public List<AccountEntity> getAllAccounts() {
        return accountRepository.findAll();
    }
    // Method to retrieve accounts by status
    public List<AccountEntity> getAccountsByStatus(AccountStatus status) {
        return accountRepository.findByStatus(status);
    }

    // Freeze account
    public AccountEntity freezeAccount(Long id) {
        AccountEntity account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        account.setStatus(AccountStatus.FROZEN);
        return accountRepository.save(account);
    }

    // Unfreeze account
    public AccountEntity unfreezeAccount(Long id) {
        AccountEntity account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        account.setStatus(AccountStatus.ACTIVE);
        return accountRepository.save(account);
    }

    // Close account
    public void closeAccount(Long id) {
        AccountEntity account = accountRepository.findById(id).orElseThrow(() -> new RuntimeException("Account not found"));
        account.setStatus(AccountStatus.CLOSED);
        accountRepository.save(account);
    }
}
