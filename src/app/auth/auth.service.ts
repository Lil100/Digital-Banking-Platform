import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

// Define an interface matching your backend's response
export interface LoginResponse {
  message: string;
  user: {
    role: string;
    fullName: string;
    email: string;
  };
  token: string;
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private apiUrl = 'http://172.16.2.144:9082/api';

  constructor(private http: HttpClient) {}

  /**
   * Login method: When valid credentials are provided, the backend
   * returns an object matching the LoginResponse interface.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    console.log('Attempting login with:', loginData);

    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, loginData).pipe(
      tap((response: LoginResponse) => {
        console.log('Login successful:', response);
        // Save the token and role if the response structure is as expected
        if (response && response.token && response.user && response.user.role) {
          this.saveToken(response.token, response.user.role);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Registration method
   */
  register(
    fullName: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const registerData = { fullName, email, password, role };
    console.log('Attempting registration with:', registerData);

    return this.http.post(`${this.apiUrl}/users/register`, registerData).pipe(
      tap(response => console.log('Registration successful:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Logout method: Clears token and role from localStorage.
   */
  logout(): void {
    console.log('Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
  }

  /**
   * Store token & role in localStorage.
   */
  saveToken(token: string, role: string): void {
    console.log('Saving token and role:', { token, role });
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
  }

  /**
   * Retrieve token from localStorage.
   */
  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.log('Retrieved token:', token);
    return token;
  }

  /**
   * Retrieve role from localStorage.
   */
  getRole(): string | null {
    const role = localStorage.getItem('role');
    console.log('Retrieved role:', role);
    return role;
  }

  /**
   * Forgot Password method.
   */
  forgotPassword(email: string): Observable<any> {
    console.log('Attempting forgot password with:', email);
    return this.http.post(`${this.apiUrl}/users/forgot-password`, { email }).pipe(
      tap(response => console.log('Forgot password response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Global error handler.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('Error occurred:', error);

    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      // Client-side error
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      // Server-side error
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }

    console.error(errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
