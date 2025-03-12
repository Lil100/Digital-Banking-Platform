import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators
} from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { AccountService, Account } from '../../services/account.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, FormsModule],
  selector: 'app-deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css'],
})
export class DepositWithdrawComponent implements OnInit {
  transForm: FormGroup;
  action: 'deposit' | 'withdraw' = 'deposit';
  accounts: Account[] = [];
  selectedAccount: Account | null = null;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService,
    private accountService: AccountService
  ) {
    this.transForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  ngOnInit(): void {
    console.debug('DepositWithdrawComponent initialized');
    // For demonstration, we use a static customer id of 1. Update as needed.
    this.accountService.getAccountsByCustomerId(1).subscribe({
      next: (accounts) => {
        this.accounts = accounts;
        console.debug('Accounts fetched:', this.accounts);
      },
      error: (err) => console.error('Error fetching accounts', err),
    });
  }

  setAction(action: 'deposit' | 'withdraw'): void {
    this.action = action;
    console.debug('Action set to:', this.action);
  }

  onAccountSelect(event: Event): void {
    // Extract the selected value from the event in a type-safe way
    const target = event.target as HTMLSelectElement;
    const accountId = parseInt(target.value, 10);

    this.selectedAccount =
      this.accounts.find((acc) => acc.id === accountId) || null;

    console.debug('Selected account:', this.selectedAccount);
  }

  submit(): void {
    if (this.transForm.invalid) {
      console.debug('Form is invalid:', this.transForm.errors);
      return;
    }

    if (!this.selectedAccount) {
      this.errorMessage = 'Please select an account.';
      console.error('No account selected');
      return;
    }

    const amount = this.transForm.value.amount;
    console.debug('Transaction attempt:', {
      action: this.action,
      amount,
      account: this.selectedAccount,
    });

    if (this.action === 'withdraw') {
      if (amount > this.selectedAccount.balance) {
        console.error('Insufficient funds:', {
          currentBalance: this.selectedAccount.balance,
          requested: amount,
        });
        this.errorMessage = 'Insufficient balance for withdrawal.';
        return;
      } else {
        this.selectedAccount.balance -= amount;
        console.debug(
          'Withdrawal processed locally. New account balance:',
          this.selectedAccount.balance
        );
      }
    } else if (this.action === 'deposit') {
      this.selectedAccount.balance += amount;
      console.debug(
        'Deposit processed locally. New account balance:',
        this.selectedAccount.balance
      );
    }

    // Reset error message after successful local validation
    this.errorMessage = '';

    // Updated payload includes the account ID
    const payload = {
      action: this.action,
      amount,
      accountId: this.selectedAccount.id,
    };

    this.transactionService.depositOrWithdraw(payload).subscribe({
      next: () => {
        alert('Transaction successful');
        console.debug('Transaction successful with payload:', payload);
      },
      error: (err) => {
        console.error('Transaction error:', err);
        this.errorMessage = 'Transaction failed. Please try again.';
      },
    });
  }
}
