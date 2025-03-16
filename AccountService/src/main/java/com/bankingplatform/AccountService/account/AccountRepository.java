package com.bankingplatform.AccountService.account;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface AccountRepository extends JpaRepository<AccountEntity, Long> {

    Optional<AccountEntity> findByAccountNumber(String accountNumber);

    // Custom query to find accounts by status
    @Query("SELECT a FROM AccountEntity a WHERE a.status = :status")
    List<AccountEntity> findByStatus(AccountStatus status);

    List<AccountEntity> findByCustomerId(Long customerId);

    Optional<AccountEntity> findByEmail(String email);


}
