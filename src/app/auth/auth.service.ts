import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoginResponse {
  message: string;
  user: {
    userId: number;
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
  private apiUrl = 'http://172.16.2.171:9090/api';

  constructor(private http: HttpClient) {
    console.debug('[AuthService] Constructor: AuthService initialized.');
  }

  /**
   * Login method: Uses provided email and password to authenticate a user.
   */
  login(email: string, password: string): Observable<LoginResponse> {
    const loginData = { email, password };
    console.debug('[AuthService] Attempting login with:', loginData);

    return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, loginData).pipe(
      tap((response: LoginResponse) => {
        console.debug('[AuthService] Login successful:', response);
        // Store the entire login response in localStorage
        localStorage.setItem('loggedInUser', JSON.stringify(response));
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Registration method: Registers a new user with the provided details.
   */
  register(fullName: string, email: string, password: string, role: string): Observable<any> {
    const registerData = { fullName, email, password, role };
    console.debug('[AuthService] Attempting registration with:', registerData);

    return this.http.post(`${this.apiUrl}/users/register`, registerData).pipe(
      tap(response => console.debug('[AuthService] Registration successful:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Logout method: Clears logged in user data from localStorage.
   */
  logout(): void {
    console.debug('[AuthService] Logging out...');
    localStorage.removeItem('loggedInUser');
  }

  /**
   * Retrieves the token from the stored loggedInUser object.
   */
  getToken(): string | null {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      try {
        const response: LoginResponse = JSON.parse(data);
        console.debug('[AuthService] Retrieved token from loggedInUser:', response.token);
        return response.token;
      } catch (error) {
        console.error('[AuthService] Error parsing loggedInUser:', error);
        return null;
      }
    }
    console.debug('[AuthService] No loggedInUser found in localStorage.');
    return null;
  }

  /**
   * Retrieves the email from the stored loggedInUser object.
   */
  getEmail(): string | null {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      try {
        const response: LoginResponse = JSON.parse(data);
        console.debug('[AuthService] Retrieved email from loggedInUser:', response.user.email);
        return response.user.email;
      } catch (error) {
        console.error('[AuthService] Error parsing loggedInUser:', error);
        return null;
      }
    }
    console.debug('[AuthService] No loggedInUser found in localStorage.');
    return null;
  }

  /**
   * Retrieves the role from the stored loggedInUser object.
   */
  getRole(): string | null {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      try {
        const response: LoginResponse = JSON.parse(data);
        console.debug('[AuthService] Retrieved role from loggedInUser:', response.user.role);
        return response.user.role;
      } catch (error) {
        console.error('[AuthService] Error parsing loggedInUser:', error);
        return null;
      }
    }
    console.debug('[AuthService] No loggedInUser found in localStorage.');
    return null;
  }

  /**
   * Retrieves the user ID from the stored loggedInUser object.
   */
  getUserId(): number | null {
    const data = localStorage.getItem('loggedInUser');
    if (data) {
      try {
        const response: LoginResponse = JSON.parse(data);
        console.debug('[AuthService] Retrieved user id from loggedInUser:', response.user.userId);
        return response.user.userId;
      } catch (error) {
        console.error('[AuthService] Error parsing loggedInUser:', error);
        return null;
      }
    }
    console.debug('[AuthService] No loggedInUser found in localStorage.');
    return null;
  }

  isLoggedIn(): boolean {
    const loggedIn = this.getToken() !== null;
    console.debug('[AuthService] isLoggedIn:', loggedIn);
    return loggedIn;
  }

  /**
   * Forgot Password method.
   */
  forgotPassword(email: string): Observable<any> {
    console.debug('[AuthService] Attempting forgot password with:', email);
    return this.http.post(`${this.apiUrl}/users/forgot-password`, { email }).pipe(
      tap(response => console.debug('[AuthService] Forgot password response:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Retrieves a user by their ID.
   * API endpoint: http://172.16.2.171:9090/api/users/{id}
   */
  getUserById(userId: number): Observable<any> {
    const url = `${this.apiUrl}/users/${userId}`;
    console.debug(`[AuthService] Fetching user with URL: ${url}`);
    return this.http.get(url).pipe(
      tap(user => console.debug('[AuthService] Fetched user:', user)),
      catchError(this.handleError)
    );
  }

  /**
   * Global error handler.
   */
  private handleError(error: HttpErrorResponse): Observable<never> {
    console.error('[AuthService] Error occurred:', error);
    let errorMessage = 'An unknown error occurred!';
    if (error.error instanceof ErrorEvent) {
      errorMessage = `Client-side error: ${error.error.message}`;
    } else {
      errorMessage = `Server error (${error.status}): ${error.message}`;
    }
    console.error('[AuthService]', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
