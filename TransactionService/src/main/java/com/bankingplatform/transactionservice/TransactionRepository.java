package com.bankingplatform.transactionservice;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface TransactionRepository extends JpaRepository<TransactionEntity, Long> {

    // Find transactions by fromAccountId or toAccountId
    List<TransactionEntity> findByFromAccountId(Long accountId);

    List<TransactionEntity> findByToAccountId(Long accountId);

    List<TransactionEntity> findAll();

    List<TransactionEntity> findByStatus(String status);

}
