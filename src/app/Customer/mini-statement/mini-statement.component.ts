// import { Component, OnInit } from '@angular/core';
// import { TransactionService } from '../../services/transaction.service';
// import { FormsModule } from '@angular/forms';
// import { CommonModule } from '@angular/common';
// @Component({
//   standalone: true,
//   imports:[FormsModule,CommonModule],
//   selector: 'app-mini-statement',
//   templateUrl: './mini-statement.component.html',
//   styleUrls: ['./mini-statement.component.css'],
// })
// export class MiniStatementComponent implements OnInit {
//   transactions: any[] = [];

//   constructor(private transactionService: TransactionService) {}

//   ngOnInit(): void {
//     const accountId = 1; // Replace with the actual account ID logic
//     this.transactionService.getTransactionsByAccount(accountId).subscribe({
//       next: (data) => (this.transactions = data),
//       error: (err) => console.error('Mini-statement load error', err),
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { AccountService, Account } from '../../services/account.service';
import { AuthService } from '../../auth/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule],
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css'],
})
export class MiniStatementComponent implements OnInit {
  transactions: any[] = [];
  accounts: Account[] = [];
  selectedAccountId: number | null = null;
  startDate: string = '';
  endDate: string = '';
  errorMessage: string = '';

  constructor(
    private transactionService: TransactionService,
    private accountService: AccountService,
    private authService: AuthService
  ) {
    console.debug('[MiniStatementComponent] Initialized.');
  }

  ngOnInit(): void {
    const customerId = this.authService.getUserId();
    if (customerId) {
      console.debug('[MiniStatementComponent] Retrieved customerId:', customerId);
      this.accountService.getAccountsByCustomerId(customerId).subscribe({
        next: (res: Account[]) => {
          this.accounts = res;
          console.debug('[MiniStatementComponent] Accounts fetched:', this.accounts);
          if (this.accounts.length > 0) {
            // Default to the first linked account
            this.selectedAccountId = this.accounts[0].id;
            console.debug('[MiniStatementComponent] Default selected accountId:', this.selectedAccountId);
            // Load transactions without a date filter initially
            this.fetchTransactions();
          } else {
            this.errorMessage = 'No linked accounts found.';
            console.error('[MiniStatementComponent] No linked accounts.');
          }
        },
        error: (err) => {
          console.error('[MiniStatementComponent] Error fetching accounts:', err);
          this.errorMessage = 'Could not load linked accounts. Please try again later.';
        }
      });
    } else {
      this.errorMessage = 'Customer ID not found. Please log in.';
      console.error('[MiniStatementComponent] No customer ID found.');
    }
  }

  fetchTransactions(): void {
    if (!this.selectedAccountId) {
      this.errorMessage = 'Please select an account.';
      return;
    }
    console.debug(
      '[MiniStatementComponent] Fetching transactions for accountId:',
      this.selectedAccountId,
      'Start Date:',
      this.startDate,
      'End Date:',
      this.endDate
    );
    this.transactionService.getTransactionsByAccount(this.selectedAccountId, this.startDate, this.endDate).subscribe({
      next: (data: any[]) => {
        this.transactions = data;
        console.debug('[MiniStatementComponent] Transactions fetched:', this.transactions);
      },
      error: (err) => {
        console.error('[MiniStatementComponent] Error fetching transactions:', err);
        this.errorMessage = 'Mini-statement load error. Please try again later.';
      }
    });
  }

  onFilterSubmit(): void {
    console.debug('[MiniStatementComponent] Filter form submitted.');
    this.fetchTransactions();
  }
}
