package com.bankingplatform.transactionservice;

import com.bankingplatform.transactionservice.dto.AccountDTO;
import com.bankingplatform.transactionservice.dto.AccountStatus;
import com.bankingplatform.transactionservice.client.AccountClient;
import com.bankingplatform.transactionservice.client.AuditLoggingClient;
import com.bankingplatform.transactionservice.dto.AuditLogRequest;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountClient accountClient;  // Feign Client for Account Service

    @Autowired
    private AuditLoggingClient auditLoggingClient;  // Feign Client for Audit Logging Service

    // Deposit funds into an account
    public TransactionEntity deposit(Long accountId, double amount) {
        log.info("Initiating deposit: Account ID = {}, Amount = {}", accountId, amount);
        AccountDTO account = accountClient.getAccountById(accountId);
        validateAccount(account);

        log.info("Updating account balance for Account ID = {}. New Balance = {}", accountId, account.getBalance() + amount);
        accountClient.updateAccountBalance(accountId, account.getBalance() + amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.DEPOSIT);
        transaction = transactionRepository.save(transaction);
        log.info("Deposit transaction saved. Transaction ID = {}", transaction.getId());

        // Log transaction in Audit Logging Service
        auditLoggingClient.logTransaction(new AuditLogRequest(
                "DEPOSIT", String.valueOf(transaction.getId()), accountId, amount, "SUCCESS"
        ));
        log.info("Deposit transaction logged in Audit Service.");

        return transaction;
    }

    // Withdraw funds from an account
    public TransactionEntity withdraw(Long accountId, double amount) {
        log.info("Initiating withdrawal: Account ID = {}, Amount = {}", accountId, amount);
        AccountDTO account = accountClient.getAccountById(accountId);
        validateAccount(account);

        if (account.getBalance() < amount) {
            log.error("Withdrawal failed: Insufficient balance in Account ID = {}", accountId);
            throw new IllegalStateException("Insufficient balance");
        }

        log.info("Updating account balance for Account ID = {}. New Balance = {}", accountId, account.getBalance() - amount);
        accountClient.updateAccountBalance(accountId, account.getBalance() - amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.WITHDRAWAL);
        transaction = transactionRepository.save(transaction);
        log.info("Withdrawal transaction saved. Transaction ID = {}", transaction.getId());

        // Log transaction in Audit Logging Service
        auditLoggingClient.logTransaction(new AuditLogRequest(
                "WITHDRAWAL", String.valueOf(transaction.getId()), accountId, amount, "SUCCESS"
        ));
        log.info("Withdrawal transaction logged in Audit Service.");

        return transaction;
    }

    // Transfer funds between accounts
    public TransactionEntity transfer(Long fromAccountId, Long toAccountId, double amount) {
        log.info("Initiating transfer: From Account ID = {}, To Account ID = {}, Amount = {}", fromAccountId, toAccountId, amount);
        AccountDTO sender = accountClient.getAccountById(fromAccountId);
        validateAccount(sender);

        if (sender.getBalance() < amount) {
            log.error("Transfer failed: Insufficient balance in Sender Account ID = {}", fromAccountId);
            throw new IllegalStateException("Insufficient balance");
        }

        // Get the receiver account
        AccountDTO receiver = accountClient.getAccountById(toAccountId);
        validateAccount(receiver);

        log.info("Updating account balances: Sender ID = {}, Receiver ID = {}", fromAccountId, toAccountId);
        accountClient.updateAccountBalance(fromAccountId, sender.getBalance() - amount);
        accountClient.updateAccountBalance(toAccountId, receiver.getBalance() + amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(fromAccountId);
        transaction.setToAccountId(toAccountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.TRANSFER);
        transaction.setStatus(TransactionStatus.PENDING); // Set default status
        transaction = transactionRepository.save(transaction);
        log.info("Transfer transaction saved. Transaction ID = {}", transaction.getId());

        // Log transaction in Audit Logging Service
        auditLoggingClient.logTransaction(new AuditLogRequest(
                "TRANSFER", String.valueOf(transaction.getId()), fromAccountId, amount, "SUCCESS"
        ));
        log.info("Transfer transaction logged in Audit Service.");

        return transaction;
    }

    // Fetch all transactions for an account
    public List<TransactionEntity> getTransactionsForAccount(Long accountId) {
        log.info("Fetching transactions for Account ID = {}", accountId);
        List<TransactionEntity> transactionsFrom = transactionRepository.findByFromAccountId(accountId);
        List<TransactionEntity> transactionsTo = transactionRepository.findByToAccountId(accountId);
        transactionsFrom.addAll(transactionsTo);
        return transactionsFrom;
    }

    // Helper method to validate accounts
    private void validateAccount(AccountDTO account) {
        if (account == null || account.getStatus() != AccountStatus.ACTIVE) {
            log.error("Account validation failed. Account is not active or does not exist.");
            throw new IllegalStateException("Account is not active or does not exist");
        }
        log.info("Account validation passed. Account ID = {}", account.getId());
    }

    // Fetch all transactions
    public List<TransactionEntity> getAllTransactions() {
        log.info("Fetching all transactions from the database.");
        return transactionRepository.findAll();
    }

    // Delete a transaction
    public boolean deleteTransaction(Long transactionId) {
        log.info("Attempting to delete transaction ID = {}", transactionId);
        if (transactionRepository.existsById(transactionId)) {
            transactionRepository.deleteById(transactionId);
            log.info("Transaction ID = {} successfully deleted.", transactionId);
            return true;
        }
        log.warn("Transaction ID = {} not found. Deletion failed.", transactionId);
        return false;
    }

    // Update a transaction
    public Optional<TransactionEntity> updateTransaction(Long transactionId, TransactionEntity updatedTransaction) {
        log.info("Attempting to update transaction ID = {}", transactionId);
        return transactionRepository.findById(transactionId).map(existingTransaction -> {
            existingTransaction.setAmount(updatedTransaction.getAmount());
            log.info("Transaction ID = {} updated successfully.", transactionId);
            return transactionRepository.save(existingTransaction);
        });
    }

    public List<TransactionEntity> getPendingTransactions() {
        log.info("Fetching all pending transactions.");
        return transactionRepository.findByStatus("PENDING");
    }

    public AccountDTO getAccountDetails(Long id) {
        log.info("Fetching account details for ID: {}", id);
        return accountClient.getAccountById(id);
    }
}
