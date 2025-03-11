import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule } from '@angular/forms';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[CommonModule,ReactiveFormsModule],
  selector: 'app-transaction-filter',
  templateUrl: './transaction-filter.component.html',
  styleUrls: ['./transaction-filter.component.css'],
})
export class TransactionFilterComponent implements OnInit {
  filterForm: FormGroup;
  transactions: Transaction[] = [];
  loading: boolean = false;

  constructor(
    private fb: FormBuilder,
    private transactionService: TransactionService
  ) {
    this.filterForm = this.fb.group({
      startDate: [''],
      endDate: [''],
      transactionType: ['ALL'],
      amountMin: [''],
      amountMax: [''],
    });
  }

  ngOnInit(): void {
    // Optionally, load all transactions on init
    this.onSearch();
  }

  onSearch(): void {
    this.loading = true;
    const criteria = this.filterForm.value;
    this.transactionService.searchTransactions(criteria).subscribe({
      next: (data) => {
        this.transactions = data;
        this.loading = false;
      },
      error: (err) => {
        console.error('Search error', err);
        this.loading = false;
      },
    });
  }
}
