import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Transaction {
  id: number;
  customerName: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  date: string;
  status: string;
  fromAccountId:number;
  toAccountid:number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private pendingUrl = '/api/transactions/pending';
  private searchUrl = '/api/transactions/search';
  private miniStatementUrl = '/http://172.16.2.130:8083/api/transactions';
  private depositWithdrawUrl = '/api/transactions/deposit/withdraw';
  private transferUrl = '/api/transactions/transfer';

  constructor(private http: HttpClient) {}

  // Admin functionality
  getPendingTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(this.pendingUrl);
  }

  approveTransaction(id: number): Observable<any> {
    return this.http.post(`/api/transactions/${id}/approve`, {});
  }
  getAllTransactions(): Observable<Transaction[]> {
    return this.http.get<Transaction[]>('http://172.16.2.130:8083/api/transactions/all');
  }
  rejectTransaction(id: number): Observable<any> {
    return this.http.post(`/api/transactions/${id}/reject`, {});
  }

  searchTransactions(criteria: any): Observable<Transaction[]> {
    let params = new HttpParams();
    if (criteria.startDate) {
      params = params.set('startDate', criteria.startDate);
    }
    if (criteria.endDate) {
      params = params.set('endDate', criteria.endDate);
    }
    if (criteria.transactionType && criteria.transactionType !== 'ALL') {
      params = params.set('transactionType', criteria.transactionType);
    }
    if (criteria.amountMin != null) {
      params = params.set('amountMin', criteria.amountMin.toString());
    }
    if (criteria.amountMax != null) {
      params = params.set('amountMax', criteria.amountMax.toString());
    }
    return this.http.get<Transaction[]>(this.searchUrl, { params });
  }

  // Customer functionality
  getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
    return this.http.get<Transaction[]>(`${this.miniStatementUrl}/${accountId}`);
  }

  depositOrWithdraw(payload: { action: 'deposit' | 'withdraw'; amount: number }): Observable<any> {
    return this.http.post(this.depositWithdrawUrl, payload);
  }

  transferFunds(payload: { targetAccount: string; amount: number }): Observable<any> {
    return this.http.post(this.transferUrl, payload);
  }
}
