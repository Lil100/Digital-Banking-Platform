// all-transactions.component.ts
import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TransactionService, Transaction } from '../../services/transaction.service';// Adjust path if needed
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-all-transactions',
  standalone: true,
  imports: [
    CommonModule,FormsModule
    // If you have a dedicated FontAwesomeModule or Bootstrap modules, import them here too.
  ],
  template: `
    <div class="container my-4">
      <h2 class="mb-3">All Transactions</h2>
      
      <!-- Card with shadow for that subtle 3D effect -->
      <div class="card shadow">
        <div class="card-body p-0">
          
          <!-- Responsive table to handle small screens -->
          <div class="table-responsive">
            <table class="table table-hover mb-0">
              <thead class="table-dark">
                <tr>
                  <th scope="col">Transaction ID</th>
                  <th scope="col">Source Account ID</th>
                  <!-- <th scope="col">Destination Account ID</th> -->
                  
                  <th scope="col">Amount</th>
                  <th scope="col">Type</th>
                  <th scope="col">Transaction Date</th>
                </tr>
              </thead>
              <tbody>
                <tr *ngFor="let transaction of transactions">
                  <th scope="row">{{ transaction.id }}</th>
                  <td>{{ transaction.fromAccountId }}</td>
                  <td>{{ transaction.amount | currency }}</td>
                  
                  <!-- Font Awesome icons for each transaction type -->
                  <td>
                    <i class="fas"
                      [ngClass]="{
                        'fa-arrow-circle-down text-success': transaction.type === 'DEPOSIT',
                        'fa-arrow-circle-up text-danger': transaction.type === 'WITHDRAW',
                        'fa-exchange-alt text-info': transaction.type === 'TRANSFER'
                      }">
                    </i>
                    {{ transaction.type }}
                  </td>
                  
                  <!-- Format date nicely -->
                  <td>{{ transaction.date | date:'medium' }}</td>
                  
                  <!-- Bootstrap badge color-coded by status -->
                  <!-- <td>
                    <span class="badge"
                      [ngClass]="{
                        'bg-success': transaction.status.toUpperCase() === 'APPROVED',
                        'bg-danger': transaction.status.toUpperCase() === 'REJECTED',
                        'bg-warning text-dark': transaction.status.toUpperCase() === 'PENDING'
                      }">
                      {{ transaction.status }}
                    </span>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div> <!-- table-responsive -->
        </div> <!-- card-body -->
      </div> <!-- card -->
    </div>
  `,
  styles: [`
    /* Additional hover or custom styling if desired */
    tr:hover {
      background-color: #f9f9f9;
    }
  `]
})
export class AllTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    this.fetchAllTransactions();
  }

  fetchAllTransactions(): void {
    this.transactionService.getAllTransactions().subscribe({
      next: (data) => {
        this.transactions = data;
      },
      error: (err) => {
        console.error('Error fetching transactions', err);
      }
    });
  }
}
