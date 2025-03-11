import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { TransactionService } from '../../services/transaction.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule,FormsModule],
  selector: 'app-deposit-withdraw',
  templateUrl: './deposit-withdraw.component.html',
  styleUrls: ['./deposit-withdraw.component.css'],
})
export class DepositWithdrawComponent {
  transForm: FormGroup;
  action: 'deposit' | 'withdraw' = 'deposit';

  constructor(private fb: FormBuilder, private transactionService: TransactionService) {
    this.transForm = this.fb.group({
      amount: [0, [Validators.required, Validators.min(1)]],
    });
  }

  submit(): void {
    if (this.transForm.invalid) return;
    const payload = { action: this.action, amount: this.transForm.value.amount };
    this.transactionService.depositOrWithdraw(payload).subscribe({
      next: () => alert('Transaction successful'),
      error: (err) => console.error('Transaction error', err),
    });
  }
}
