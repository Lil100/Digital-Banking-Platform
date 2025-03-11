import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';
@Component({
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  selector: 'app-transfer-funds',
  templateUrl: './transfer-funds.component.html',
  styleUrls: ['./transfer-funds.component.css'],
})
export class TransferFundsComponent {
  transferForm: FormGroup;

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transferForm = this.fb.group({
      targetAccount: ['', Validators.required],
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    if (this.transferForm.invalid) return;
    this.transactionService.transferFunds(this.transferForm.value).subscribe({
      next: () => alert('Transfer successful'),
      error: (err) => console.error('Transfer error', err),
    });
  }
}
