package com.bankingplatform.transactionservice;

import com.bankingplatform.transactionservice.DTO.AccountDTO;
import com.bankingplatform.transactionservice.DTO.AccountStatus;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class TransactionService {

    @Autowired
    private TransactionRepository transactionRepository;

    @Autowired
    private AccountClient accountClient;  // Feign Client to fetch account details

    // Deposit funds into an account
    public TransactionEntity deposit(Long accountId, double amount) {
        AccountDTO account = accountClient.getAccountById(accountId);
        validateAccount(account);

        // Update the account balance
        accountClient.updateAccountBalance(accountId, account.getBalance() + amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.DEPOSIT);

        return transactionRepository.save(transaction);
    }

    // Withdraw funds from an account
    public TransactionEntity withdraw(Long accountId, double amount) {
        AccountDTO account = accountClient.getAccountById(accountId);
        validateAccount(account);

        if (account.getBalance() < amount) {
            throw new IllegalStateException("Insufficient balance");
        }

        // Update the account balance
        accountClient.updateAccountBalance(accountId, account.getBalance() - amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(accountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.WITHDRAWAL);

        return transactionRepository.save(transaction);
    }

    // Transfer funds between accounts
    public TransactionEntity transfer(Long fromAccountId, Long toAccountId, double amount) {
        AccountDTO sender = accountClient.getAccountById(fromAccountId);
        validateAccount(sender);

        if (sender.getBalance() < amount) {
            throw new IllegalStateException("Insufficient balance");
        }

        // Get the receiver account
        AccountDTO receiver = accountClient.getAccountById(toAccountId);
        validateAccount(receiver);

        // Update the balances of both accounts
        accountClient.updateAccountBalance(fromAccountId, sender.getBalance() - amount);
        accountClient.updateAccountBalance(toAccountId, receiver.getBalance() + amount);

        // Create and save the transaction
        TransactionEntity transaction = new TransactionEntity();
        transaction.setFromAccountId(fromAccountId);
        transaction.setToAccountId(toAccountId);
        transaction.setAmount(amount);
        transaction.setType(TransactionType.TRANSFER);

        return transactionRepository.save(transaction);
    }

    // Fetch all transactions for an account
    public List<TransactionEntity> getTransactionsForAccount(Long accountId) {
        List<TransactionEntity> transactionsFrom = transactionRepository.findByFromAccountId(accountId);
        List<TransactionEntity> transactionsTo = transactionRepository.findByToAccountId(accountId);
        transactionsFrom.addAll(transactionsTo);
        return transactionsFrom;
    }

    // Helper method to validate accounts
    private void validateAccount(AccountDTO account) {
        if (account == null || account.getStatus() != AccountStatus.ACTIVE) {
            throw new IllegalStateException("Account is not active or does not exist");
        }
    }

    private List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAll();
    }
}
