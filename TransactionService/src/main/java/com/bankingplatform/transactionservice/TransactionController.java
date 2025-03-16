package com.bankingplatform.transactionservice;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/transactions")
public class TransactionController {

    @Autowired
    private TransactionService transactionService;
    @Autowired
    private TransactionRepository transactionRepository;

    // Deposit funds
    @PostMapping("/deposit")
    public ResponseEntity<?> deposit(@RequestParam Long accountId, @RequestParam double amount) {
        try {
            TransactionEntity transaction = transactionService.deposit(accountId, amount);
            return new ResponseEntity<>(transaction, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Withdraw funds
    @PostMapping("/withdraw")
    public ResponseEntity<?> withdraw(@RequestParam Long accountId, @RequestParam double amount) {
        try {
            TransactionEntity transaction = transactionService.withdraw(accountId, amount);
            return new ResponseEntity<>(transaction, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Transfer funds
    @PostMapping("/transfer")
    public ResponseEntity<?> transfer(
            @RequestParam Long fromAccountId,
            @RequestParam Long toAccountId,
            @RequestParam double amount) {
        try {
            TransactionEntity transaction = transactionService.transfer(fromAccountId, toAccountId, amount);
            return new ResponseEntity<>(transaction, HttpStatus.CREATED);
        } catch (IllegalStateException e) {
            return new ResponseEntity<>(e.getMessage(), HttpStatus.BAD_REQUEST);
        }
    }

    // Get transactions for an account
    @GetMapping("/account/{accountId}")
    public ResponseEntity<?> getTransactionsForAccount(@PathVariable Long accountId) {
        List<TransactionEntity> transactions = transactionService.getTransactionsForAccount(accountId);
        if (transactions.isEmpty()) {
            return new ResponseEntity<>("No transactions found", HttpStatus.NO_CONTENT);
        }
        return new ResponseEntity<>(transactions, HttpStatus.OK);
    }

    @GetMapping("/all")
    public List<TransactionEntity> getAllTransactions() {
        return transactionRepository.findAll();
    }

}