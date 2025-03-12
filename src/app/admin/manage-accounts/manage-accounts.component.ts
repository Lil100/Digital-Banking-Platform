import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormComponent } from '../account-form/account-form.component';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(
    private accountService: AccountService,
    private dialog: MatDialog
  ) {}

  ngOnInit(): void {
    this.loadAccounts();
  }

  /**
   * Loads all accounts from the backend
   */
  loadAccounts(): void {
    this.accountService.getAccounts().subscribe((data) => {
      this.accounts = data;
    });
  }

  /**
   * Opens the account form for creating or editing an account
   */
  openAccountForm(account: Account | null = null): void {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '500px',
      data: account
    });
    dialogRef.afterClosed().subscribe(() => this.loadAccounts());
  }

  /**
   * Toggles an account between ACTIVE and FROZEN,
   * unless the account is CLOSED (which we won't modify).
   */
  freezeUnfreezeAccount(account: Account): void {
    // If the account is CLOSED, do nothing
    if (account.status === 'CLOSED') {
      alert('Cannot change the status of a closed account.');
      return;
    }

    // Toggle status between ACTIVE and FROZEN
    const newStatus = account.status === 'ACTIVE' ? 'FROZEN' : 'ACTIVE';
    this.accountService.toggleAccountStatus(account.id, newStatus)
      .subscribe(() => this.loadAccounts());
  }
}
