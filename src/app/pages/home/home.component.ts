import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { TransactionService } from '../../services/transaction.service';
// If you have a dedicated CustomerService, import it here
import { CustomerService } from '../../services/customer.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  totalCustomers: number = 0;
  totalAccounts: number = 0;
  pendingTransactions: number = 0;

  constructor(
    private accountService: AccountService,
    private transactionService: TransactionService,
     private customerService: CustomerService
  ) {}

  ngOnInit(): void {
    // Fetch the data as soon as the component loads
    this.fetchCustomersCount();
    this.fetchAccountsCount();
    this.fetchPendingTransactionsCount();
  }

  /**
   * Example method to fetch the total number of customers.
   * Replace with real service call if available.
   */
  fetchCustomersCount(): void {
    // If you have a real CustomerService:
   
    this.customerService.getCustomers().subscribe({
      next: (customers) => {
        this.totalCustomers = customers.length;
      },
      error: (err) => console.error('Error fetching customers', err),
    });
  

    // Placeholder for demonstration:
    this.totalCustomers = 42; 
  }

  /**
   * Fetch the total number of accounts.
   */
  fetchAccountsCount(): void {
    this.accountService.getAccounts().subscribe({
      next: (accounts) => {
        this.totalAccounts = accounts.length;
      },
      error: (err) => console.error('Error fetching accounts', err),
    });
  }

  /**
   * Fetch the number of pending transactions.
   */
  fetchPendingTransactionsCount(): void {
    this.transactionService.getPendingTransactions().subscribe({
      next: (transactions) => {
        this.pendingTransactions = transactions.length;
      },
      error: (err) => console.error('Error fetching pending transactions', err),
    });
  }
}
