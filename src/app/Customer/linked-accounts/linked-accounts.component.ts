import { Component, OnInit } from '@angular/core';
import { AccountService } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports:[CommonModule,FormsModule],
  selector: 'app-linked-accounts',
  templateUrl: './linked-accounts.component.html',
  styleUrls: ['./linked-accounts.component.css'],
})
export class LinkedAccountsComponent implements OnInit {
  accounts: any[] = [];

  constructor(private accountService: AccountService) {}

  ngOnInit(): void {
    const customerId = 1; // Replace with real customer ID logic
    this.accountService.getAccountsByCustomerId(customerId).subscribe({
      next: (data) => (this.accounts = data),
      error: (err) => console.error('Accounts load error', err),
    });
  }
}
