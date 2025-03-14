// import { Component, OnInit } from '@angular/core';
// import { AccountService, Account } from '../../services/account.service';
// import { CommonModule } from '@angular/common';

// @Component({
//   selector: 'app-linked-accounts',
//   templateUrl: './linked-accounts.component.html',
//   imports:[CommonModule],
//   styleUrls: ['./linked-accounts.component.css']
// })
// export class LinkedAccountsComponent implements OnInit {
//   accounts: Account[] = [];
//   errorMessage: string = '';

//   constructor(private accountService: AccountService) {}

//   ngOnInit(): void {
//     // Replace "1" with the actual customerId you want to load accounts for
//     this.fetchLinkedAccounts(1);
//   }

//   fetchLinkedAccounts(customerId: number): void {
//     this.accountService.getAccountsByCustomerId(customerId).subscribe({
//       next: (res) => {
//         // If your backend returns an array of accounts directly:
//         // this.accounts = res;

//         // If your backend returns something like { data: [...] }:
//         this.accounts = res;

//         console.log('Linked accounts fetched:', this.accounts);
//       },
//       error: (err) => {
//         console.error('Error fetching linked accounts:', err);
//         this.errorMessage = 'Could not load linked accounts. Please try again later.';
//       },
//     });
//   }
// }
import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-linked-accounts',
  templateUrl: './linked-accounts.component.html',
  imports: [CommonModule],
  styleUrls: ['./linked-accounts.component.css']
})
export class LinkedAccountsComponent implements OnInit {
  accounts: Account[] = [];
  errorMessage: string = '';

  constructor(
    private accountService: AccountService,
    private authService: AuthService
  ) {
    console.debug('[LinkedAccountsComponent] Constructor: Component instance created.');
  }

  ngOnInit(): void {
    console.debug('[LinkedAccountsComponent] ngOnInit: Initialization started.');
    const customerId = this.authService.getUserId();
    if (customerId) {
      console.debug('[LinkedAccountsComponent] Retrieved customerId:', customerId);
      this.fetchLinkedAccounts(customerId);
    } else {
      this.errorMessage = 'Customer ID not found. Please log in.';
      console.error('[LinkedAccountsComponent] Customer ID not found in AuthService.');
    }
  }

  fetchLinkedAccounts(customerId: number): void {
    console.debug('[LinkedAccountsComponent] Fetching linked accounts for customerId:', customerId);
    this.accountService.getAccountsByCustomerId(customerId).subscribe({
      next: (res) => {
        // Assuming the backend returns an array of accounts directly.
        this.accounts = res;
        console.debug('[LinkedAccountsComponent] Linked accounts fetched successfully:', this.accounts);
      },
      error: (err) => {
        console.error('[LinkedAccountsComponent] Error fetching linked accounts:', err);
        this.errorMessage = 'Could not load linked accounts. Please try again later.';
      }
    });
  }
}
