import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface Customer {
  id: number;
  name: string;
  email: string;
  phone: string;
  address?: string; 
  status?: string;  // Optional, in case the backend doesn't always return it
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  /**
   * Updated base URL to match your colleague's local endpoint.
   * For example: http://localhost:8082/api/customers
   */
  private apiUrl = 'http://172.16.2.130:8082/api/customers';

  constructor(private http: HttpClient) {}

  /**
   * Fetch all customers using GET /api/customers/all
   */
  getCustomers(): Observable<Customer[]> {
    const url = `${this.apiUrl}/all`;
    console.log('[CustomerService] Fetching all customers from:', url);

    return this.http.get<Customer[]>(url).pipe(
      tap((response) =>
        console.log('[CustomerService] getCustomers response:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Fetch a single customer by ID.
   */
  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[CustomerService] Fetching customer by ID from:', url);

    return this.http.get<Customer>(url).pipe(
      tap((response) =>
        console.log('[CustomerService] getCustomerById response:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Register a new customer using the /register endpoint.
   */
  registerCustomer(customer: Partial<Customer>): Observable<Customer> {
    const url = `${this.apiUrl}/register`;
    console.log('[CustomerService] Registering new customer:', customer, 'URL:', url);

    return this.http.post<Customer>(url, customer).pipe(
      tap((response) =>
        console.log('[CustomerService] registerCustomer response:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Update an existing customer by ID.
   */
  updateCustomer(id: number, customerData: Partial<Customer>): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[CustomerService] Updating customer ID:', id, 'Data:', customerData);

    return this.http.put<Customer>(url, customerData).pipe(
      tap((response) =>
        console.log('[CustomerService] updateCustomer response:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Deactivate a customer by ID.
   */
  deactivateCustomer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/deactivate`;
    console.log('[CustomerService] Deactivating customer ID:', id, 'URL:', url);

    return this.http.patch(url, {}).pipe(
      tap((response) =>
        console.log('[CustomerService] deactivateCustomer response:', response)
      ),
      catchError(this.handleError)
    );
  }

  /**
   * Global error handler for the CustomerService.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('[CustomerService] Error occurred:', error);

    let errorMessage = 'An unknown error occurred in CustomerService!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }

    console.error('[CustomerService]', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
