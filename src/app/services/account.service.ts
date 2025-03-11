import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Account {
  id: number;
  accountNumber: string;
  accountType: string;
  balance: number;
  status: string;
  customerName: string;
}

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = '/api/accounts';

  constructor(private http: HttpClient) {}

  getAccounts(): Observable<Account[]> {
    return this.http.get<Account[]>(this.apiUrl);
  }

  createAccount(account: Partial<Account>): Observable<Account> {
    return this.http.post<Account>(this.apiUrl, account);
  }
// New method to get accounts linked to a customer
getAccountsByCustomerId(customerId: number): Observable<Account[]> {
  return this.http.get<Account[]>(`${this.apiUrl}/${customerId}`);
}
  updateAccount(id: number, account: Partial<Account>): Observable<Account> {
    return this.http.put<Account>(`${this.apiUrl}/${id}`, account);
  }

  toggleAccountStatus(id: number, status: string): Observable<Account> {
    return this.http.patch<Account>(`${this.apiUrl}/${id}`, { status });
  }
}
