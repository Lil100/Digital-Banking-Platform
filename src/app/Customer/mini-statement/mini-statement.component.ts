import { Component, OnInit } from '@angular/core';
import { TransactionService } from '../../services/transaction.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports:[FormsModule,CommonModule],
  selector: 'app-mini-statement',
  templateUrl: './mini-statement.component.html',
  styleUrls: ['./mini-statement.component.css'],
})
export class MiniStatementComponent implements OnInit {
  transactions: any[] = [];

  constructor(private transactionService: TransactionService) {}

  ngOnInit(): void {
    const accountId = 1; // Replace with the actual account ID logic
    this.transactionService.getTransactionsByAccount(accountId).subscribe({
      next: (data) => (this.transactions = data),
      error: (err) => console.error('Mini-statement load error', err),
    });
  }
}
