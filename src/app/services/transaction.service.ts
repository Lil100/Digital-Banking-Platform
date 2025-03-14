// import { Injectable } from '@angular/core';
// import { HttpClient, HttpParams } from '@angular/common/http';
// import { Observable } from 'rxjs';
// import { tap } from 'rxjs/operators';

// export interface Transaction {
//   id: number;
//   customerName: string;
//   amount: number;
//   type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
//   date: string;
//   status: string;
//   fromAccountId: number;
//   toAccountid: number;
// }

// @Injectable({
//   providedIn: 'root'
// })
// export class TransactionService {
//   private pendingUrl = '/api/transactions/pending';
//   private searchUrl = '/api/transactions/search';
//   private miniStatementUrl = 'http://172.16.2.130:8083/api/transactions';
//   private depositWithdrawUrl = 'http://172.16.2.130:8083/api/transactions';
//   private transferUrl = 'http://172.16.2.130:8083/api/transactions/transfer';

//   constructor(private http: HttpClient) {}

//   // Admin functionality

//   getPendingTransactions(): Observable<Transaction[]> {
//     console.debug('[TransactionService] getPendingTransactions() - URL:', this.pendingUrl);
//     return this.http.get<Transaction[]>(this.pendingUrl).pipe(
//       tap(response => console.debug('[TransactionService] getPendingTransactions() - Response:', response))
//     );
//   }

//   approveTransaction(id: number): Observable<any> {
//     const url = `/api/transactions/${id}/approve`;
//     console.debug('[TransactionService] approveTransaction() - URL:', url);
//     return this.http.post(url, {}).pipe(
//       tap(response => console.debug('[TransactionService] approveTransaction() - Response:', response))
//     );
//   }

//   getAllTransactions(): Observable<Transaction[]> {
//     const url = 'http://172.16.2.160:9084/api/transactions/all';
//     console.debug('[TransactionService] getAllTransactions() - URL:', url);
//     return this.http.get<Transaction[]>(url).pipe(
//       tap(response => console.debug('[TransactionService] getAllTransactions() - Response:', response))
//     );
//   }

//   rejectTransaction(id: number): Observable<any> {
//     const url = `/api/transactions/${id}/reject`;
//     console.debug('[TransactionService] rejectTransaction() - URL:', url);
//     return this.http.post(url, {}).pipe(
//       tap(response => console.debug('[TransactionService] rejectTransaction() - Response:', response))
//     );
//   }

//   searchTransactions(criteria: any): Observable<Transaction[]> {
//     let params = new HttpParams();
//     if (criteria.startDate) {
//       params = params.set('startDate', criteria.startDate);
//     }
//     if (criteria.endDate) {
//       params = params.set('endDate', criteria.endDate);
//     }
//     if (criteria.transactionType && criteria.transactionType !== 'ALL') {
//       params = params.set('transactionType', criteria.transactionType);
//     }
//     if (criteria.amountMin != null) {
//       params = params.set('amountMin', criteria.amountMin.toString());
//     }
//     if (criteria.amountMax != null) {
//       params = params.set('amountMax', criteria.amountMax.toString());
//     }
//     console.debug('[TransactionService] searchTransactions() - URL:', this.searchUrl, ' Params:', params.toString());
//     return this.http.get<Transaction[]>(this.searchUrl, { params }).pipe(
//       tap(response => console.debug('[TransactionService] searchTransactions() - Response:', response))
//     );
//   }

//   // Customer functionality

//   getTransactionsByAccount(accountId: number): Observable<Transaction[]> {
//     const url = `${this.miniStatementUrl}/${accountId}`;
//     console.debug('[TransactionService] getTransactionsByAccount() - URL:', url);
//     return this.http.get<Transaction[]>(url).pipe(
//       tap(response => console.debug('[TransactionService] getTransactionsByAccount() - Response:', response))
//     );
//   }

//   depositOrWithdraw(payload: { action: 'deposit' | 'withdraw'; amount: number }): Observable<any> {
//     console.debug('[TransactionService] depositOrWithdraw() - URL:', this.depositWithdrawUrl, ' Payload:', payload);
//     return this.http.post(this.depositWithdrawUrl, payload).pipe(
//       tap(response => console.debug('[TransactionService] depositOrWithdraw() - Response:', response))
//     );
//   }

//   transferFunds(payload: { targetAccount: string; amount: number }): Observable<any> {
//     console.debug('[TransactionService] transferFunds() - URL:', this.transferUrl, ' Payload:', payload);
//     return this.http.post(this.transferUrl, payload).pipe(
//       tap(response => console.debug('[TransactionService] transferFunds() - Response:', response))
//     );
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

export interface Transaction {
  id: number;
  customerName: string;
  amount: number;
  type: 'DEPOSIT' | 'WITHDRAW' | 'TRANSFER';
  date: string;
  status: string;
  fromAccountId: number;
  toAccountid: number;
}

@Injectable({
  providedIn: 'root'
})
export class TransactionService {
  private pendingUrl = '/api/transactions/pending';
  private searchUrl = '/api/transactions/search';
  private miniStatementUrl = 'http://172.16.2.130:8083/api/transactions';
  private depositWithdrawUrl = 'http://172.16.2.130:8083/api/transactions';
  private transferUrl = 'http://172.16.2.130:8083/api/transactions/transfer';

  constructor(private http: HttpClient) {}

  // Admin functionality

  getPendingTransactions(): Observable<Transaction[]> {
    console.debug('[TransactionService] getPendingTransactions() - URL:', this.pendingUrl);
    return this.http.get<Transaction[]>(this.pendingUrl).pipe(
      tap(response => console.debug('[TransactionService] getPendingTransactions() - Response:', response))
    );
  }

  approveTransaction(id: number): Observable<any> {
    const url = `/api/transactions/${id}/approve`;
    console.debug('[TransactionService] approveTransaction() - URL:', url);
    return this.http.post(url, {}).pipe(
      tap(response => console.debug('[TransactionService] approveTransaction() - Response:', response))
    );
  }

  getAllTransactions(): Observable<Transaction[]> {
    const url = 'http://172.16.2.171:9084/api/transactions/all';
    console.debug('[TransactionService] getAllTransactions() - URL:', url);
    return this.http.get<Transaction[]>(url).pipe(
      tap(response => console.debug('[TransactionService] getAllTransactions() - Response:', response))
    );
  }

  rejectTransaction(id: number): Observable<any> {
    const url = `/api/transactions/${id}/reject`;
    console.debug('[TransactionService] rejectTransaction() - URL:', url);
    return this.http.post(url, {}).pipe(
      tap(response => console.debug('[TransactionService] rejectTransaction() - Response:', response))
    );
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
    console.debug('[TransactionService] searchTransactions() - URL:', this.searchUrl, ' Params:', params.toString());
    return this.http.get<Transaction[]>(this.searchUrl, { params }).pipe(
      tap(response => console.debug('[TransactionService] searchTransactions() - Response:', response))
    );
  }

  // Customer functionality

  getTransactionsByAccount(accountId: number, startDate?: string, endDate?: string): Observable<Transaction[]> {
    let params = new HttpParams();
    if (startDate) {
      params = params.set('startDate', startDate);
    }
    if (endDate) {
      params = params.set('endDate', endDate);
    }
    const url = `${this.miniStatementUrl}/${accountId}`;
    console.debug('[TransactionService] getTransactionsByAccount() - URL:', url, ' Params:', params.toString());
    return this.http.get<Transaction[]>(url, { params }).pipe(
      tap(response => console.debug('[TransactionService] getTransactionsByAccount() - Response:', response))
    );
  }

  depositOrWithdraw(payload: { action: 'deposit' | 'withdraw'; amount: number }): Observable<any> {
    console.debug('[TransactionService] depositOrWithdraw() - URL:', this.depositWithdrawUrl, ' Payload:', payload);
    return this.http.post(this.depositWithdrawUrl, payload).pipe(
      tap(response => console.debug('[TransactionService] depositOrWithdraw() - Response:', response))
    );
  }

  transferFunds(payload: { targetAccount: string; amount: number }): Observable<any> {
    console.debug('[TransactionService] transferFunds() - URL:', this.transferUrl, ' Payload:', payload);
    return this.http.post(this.transferUrl, payload).pipe(
      tap(response => console.debug('[TransactionService] transferFunds() - Response:', response))
    );
  }
}
