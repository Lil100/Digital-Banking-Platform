import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Account {
  id: number;
  accountNumber: string;
  balance: number;
  status: string;
  customerId: number;
  createdAt?: string; // or Date
  ownerId?: number;    // Added to match your console data
  accountType: string;
}
@Injectable({
  providedIn: 'root'
})
export class AccountService {
  private apiUrl = 'http://172.16.2.171:9083/api/acc/accounts';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all accounts using GET /api/accounts/all
   */
  getAccounts(): Observable<Account[]> {
    console.log('[AccountService] getAccounts() called ->', `${this.apiUrl}/all`);
    return this.http.get<Account[]>(`${this.apiUrl}/all`).pipe(
      tap(response => console.log('[AccountService] getAccounts() response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Create a new account using POST /api/accounts/create
   */
  createAccount(account: Partial<Account>): Observable<Account> {
    const url = `${this.apiUrl}/create`;
    console.log('[AccountService] createAccount() called with:', account, '->', url);
    return this.http.post<Account>(url, account).pipe(
      tap(response => console.log('[AccountService] createAccount() response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Get accounts linked to a specific customer ID
   * using GET /api/accounts/{customerId}
   */
  getAccountsByCustomerId(customerId: number): Observable<Account[]> {
    const url = `${this.apiUrl}/${customerId}`;
    console.log('[AccountService] getAccountsByCustomerId() called with:', customerId, '->', url);
    return this.http.get<Account[]>(url).pipe(
      tap(response => console.log('[AccountService] getAccountsByCustomerId() response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing account by ID (if your backend supports it)
   * using PUT /api/accounts/{id}
   */
  updateAccount(id: number, account: Partial<Account>): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[AccountService] updateAccount() called with:', { id, account }, '->', url);
    return this.http.put<Account>(url, account).pipe(
      tap(response => console.log('[AccountService] updateAccount() response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Toggle account status using PATCH /api/accounts/{id}
   * This expects the backend to interpret { status } in the request body.
   */
  toggleAccountStatus(id: number, status: string): Observable<Account> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[AccountService] toggleAccountStatus() called with:', { id, status }, '->', url);
    return this.http.patch<Account>(url, { status }).pipe(
      tap(response => console.log('[AccountService] toggleAccountStatus() response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Centralized error handler for debugging
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('[AccountService] Error occurred:', error);

    let errorMessage = 'An unknown error occurred in AccountService!';
    if (error.error instanceof ErrorEvent) {
      // Client-side or network error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Backend returned an unsuccessful response code
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }

    console.error('[AccountService]', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
