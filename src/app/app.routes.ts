import { Routes } from '@angular/router';
import { LoginComponent } from './auth/login/login.component';

import { DashboardComponent } from './admin/dashboard/dashboard.component';
import { HomeComponent } from './pages/home/home.component';
import { ManageCustomersComponent } from './admin/manage-customers/manage-customers.component';
import { ManageAccountsComponent } from './admin/manage-accounts/manage-accounts.component';
import { PendingTransactionsComponent } from './admin/pending-transactions/pending-transactions.component';
import { AuditLogsComponent } from './admin/audit-logs/audit-logs.component';
import { TransactionFilterComponent } from './admin/transaction-filter/transaction-filter.component';
import { CustomerDashboardComponent } from './Customer/customer-dashboard/customer-dashboard.component';
import { ProfileComponent } from './Customer/profile/profile.component';
import { LinkedAccountsComponent } from './Customer/linked-accounts/linked-accounts.component';
import { MiniStatementComponent } from './Customer/mini-statement/mini-statement.component';
import { DepositWithdrawComponent } from './Customer/deposit-withdraw/deposit-withdraw.component';
import { TransferFundsComponent } from './Customer/transfer-funds/transfer-funds.component';
import { NotificationsComponent } from './Customer/notifications/notifications.component';
import { RegisterComponent } from './auth/register/register.component';
import { ForgotPasswordComponent } from './auth/forgot-password/forgot-password.component';

export const routes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'full' },
    {path: 'login',component:LoginComponent},
    {path: 'register',component:RegisterComponent},
    {path:'forgot-password',component:ForgotPasswordComponent},
    { path: 'admin', component: DashboardComponent, children: [
        { path: '', redirectTo: 'home', pathMatch: 'full' },
        {path: 'home', component: HomeComponent},
        {path:'manage-customers',component: ManageCustomersComponent},
        {path: 'manage-accounts', component: ManageAccountsComponent},
        {path: 'pending-transactions', component:PendingTransactionsComponent},
        {path: 'audit-logs', component: AuditLogsComponent},
        {path: 'transaction-filter',component: TransactionFilterComponent}
      ]},
      {path:'customer',component:CustomerDashboardComponent,children:[
          {path:'profile', component:ProfileComponent},
{path: 'linked-accounts', component: LinkedAccountsComponent},
{path:'mini-statement',component:MiniStatementComponent},
{path: 'deposit-withdraw', component:DepositWithdrawComponent},
{path: 'transfer-funds', component: TransferFundsComponent},
{path: 'notifications', component:NotificationsComponent}
      ]}
];
