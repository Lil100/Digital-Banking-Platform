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
  status?: string;  // If your backend sometimes returns this
}

@Injectable({
  providedIn: 'root',
})
export class CustomerService {
  /**
   * Make sure this URL points to the correct endpoint
   * that returns customer objects in the shape shown by Swagger.
   */
  private apiUrl = 'http://172.16.2.171:9083/api/acc/customers';

  constructor(private http: HttpClient) {}

  getCustomers(): Observable<Customer[]> {
    const url = `${this.apiUrl}/all`;
    console.log('[CustomerService] Fetching all customers from:', url);
    return this.http.get<Customer[]>(url).pipe(
      tap(response => console.log('[CustomerService] getCustomers response:', response)),
      catchError(this.handleError)
    );
  }

  getCustomerById(id: number): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[CustomerService] Fetching customer by ID from:', url);
    return this.http.get<Customer>(url).pipe(
      tap(response => console.log('[CustomerService] getCustomerById response:', response)),
      catchError(this.handleError)
    );
  }

  registerCustomer(customer: Partial<Customer>): Observable<Customer> {
    const url = `${this.apiUrl}/register`;
    console.log('[CustomerService] Registering new customer:', customer, 'URL:', url);
    return this.http.post<Customer>(url, customer).pipe(
      tap(response => console.log('[CustomerService] registerCustomer response:', response)),
      catchError(this.handleError)
    );
  }
  // New method to fetch customer data by email
  getCustomerByEmail(email: string): Observable<Customer> {
    const url = `${this.apiUrl}/email/${email}`;
    console.log('[CustomerService] Fetching customer by email from:', url);

    return this.http.get<Customer>(url).pipe(
      tap((response) => console.log('[CustomerService] getCustomerByEmail response:', response)),
      catchError(this.handleError)
    );
  }
  updateCustomer(id: number, customerData: Partial<Customer>): Observable<Customer> {
    const url = `${this.apiUrl}/${id}`;
    console.log('[CustomerService] Updating customer ID:', id, 'Data:', customerData);
    return this.http.put<Customer>(url, customerData).pipe(
      tap(response => console.log('[CustomerService] updateCustomer response:', response)),
      catchError(this.handleError)
    );
  }

  deactivateCustomer(id: number): Observable<any> {
    const url = `${this.apiUrl}/${id}/deactivate`;
    console.log('[CustomerService] Deactivating customer ID:', id, 'URL:', url);
    return this.http.patch(url, {}).pipe(
      tap(response => console.log('[CustomerService] deactivateCustomer response:', response)),
      catchError(this.handleError)
    );
  }

  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('[CustomerService] Error occurred:', error);
    let errorMessage = 'An unknown error occurred in CustomerService!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }
    return throwError(() => new Error(errorMessage));
  }
}
