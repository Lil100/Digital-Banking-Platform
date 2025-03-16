package com.bankingplatform.AccountService.account;

import lombok.*;

import java.io.Serializable;
import java.math.BigDecimal;

@Getter
@Setter
@NoArgsConstructor
@AllArgsConstructor
public class AccountDTO implements Serializable {
    private Long id;
    private String accountNumber;
    private BigDecimal balance;
}
