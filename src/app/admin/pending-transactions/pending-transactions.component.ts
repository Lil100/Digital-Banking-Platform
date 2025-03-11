import { Component, OnInit } from '@angular/core';
import { TransactionService, Transaction } from '../../services/transaction.service';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports:[CommonModule,FormsModule],
  selector: 'app-pending-transactions',
  templateUrl: './pending-transactions.component.html',
  styleUrls: ['./pending-transactions.component.css']
})
export class PendingTransactionsComponent implements OnInit {
  transactions: Transaction[] = [];

  constructor(
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadTransactions();
  }

  loadTransactions(): void {
    this.transactionService.getPendingTransactions().subscribe(data => {
      this.transactions = data;
    });
  }

  approveTransaction(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Approve Transaction',
        message: 'Are you sure you want to approve this transaction?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.approveTransaction(transaction.id).subscribe(() => {
          this.loadTransactions();
        });
      }
    });
  }

  rejectTransaction(transaction: Transaction): void {
    const dialogRef = this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Reject Transaction',
        message: 'Are you sure you want to reject this transaction?'
      }
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        this.transactionService.rejectTransaction(transaction.id).subscribe(() => {
          this.loadTransactions();
        });
      }
    });
  }
}
