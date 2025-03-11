import { Component, OnInit } from '@angular/core';
import { AccountService, Account } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { AccountFormComponent } from '../account-form/account-form.component';
@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-manage-accounts',
  templateUrl: './manage-accounts.component.html',
  styleUrls: ['./manage-accounts.component.css']
})
export class ManageAccountsComponent implements OnInit {
  accounts: Account[] = [];

  constructor(private accountService: AccountService,private dialog: MatDialog) {}

  openAccountForm(account: Account | null = null): void {
    const dialogRef = this.dialog.open(AccountFormComponent, {
      width: '500px',
      data: account
    });
  
    dialogRef.afterClosed().subscribe(() => this.loadAccounts());
  }
  ngOnInit(): void {
    this.loadAccounts();
  }

  loadAccounts(): void {
    this.accountService.getAccounts().subscribe(data => {
      this.accounts = data;
    });
  }

  freezeUnfreezeAccount(account: Account): void {
    const newStatus = account.status === 'active' ? 'frozen' : 'active';
    this.accountService.toggleAccountStatus(account.id, newStatus)
      .subscribe(() => this.loadAccounts());
  }
}
