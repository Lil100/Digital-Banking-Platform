// import { Injectable } from '@angular/core';
// import { HttpClient, HttpErrorResponse } from '@angular/common/http';
// import { Observable, throwError } from 'rxjs';
// import { catchError, tap } from 'rxjs/operators';

// export interface LoginResponse {
//   message: string;
//   user: {
//     role: string;
//     fullName: string;
//     email: string;
//   };
//   token: string;
// }

// @Injectable({
//   providedIn: 'root',
// })
// export class AuthService {
//   private apiUrl = 'http://172.16.2.160:9090/api';

//   constructor(private http: HttpClient) {}

//   /**
//    * Login method: Uses provided email and password to authenticate a user.
//    */
//   login(email: string, password: string): Observable<LoginResponse> {
//     const loginData = { email, password };
//     console.log('Attempting login with:', loginData);

//     return this.http.post<LoginResponse>(`${this.apiUrl}/users/login`, loginData).pipe(
//       tap((response: LoginResponse) => {
//         console.log('Login successful:', response);
//         if (response && response.token && response.user) {
//           this.saveToken(response.token, response.user.role);
//         }
//       }),
//       catchError(this.handleError)
//     );
//   }

//   /**
//    * Registration method: Registers a new user with the provided details.
//    */
//   register(
//     fullName: string,
//     email: string,
//     password: string,
//     role: string
//   ): Observable<any> {
//     const registerData = { fullName, email, password, role };
//     console.log('Attempting registration with:', registerData);

//     return this.http.post(`${this.apiUrl}/users/register`, registerData).pipe(
//       tap(response => console.log('Registration successful:', response)),
//       catchError(this.handleError)
//     );
//   }

//   logout(): void {
//     console.log('Logging out...');
//     localStorage.removeItem('token');
//     localStorage.removeItem('role');
//   }

//   saveToken(token: string, role: string): void {
//     console.log('Saving token and role:', { token, role });
//     localStorage.setItem('token', token);
//     localStorage.setItem('role', role);
//   }

//   getToken(): string | null {
//     const token = localStorage.getItem('token');
//     console.log('Retrieved token:', token);
//     return token;
//   }
//   getEmail(): string | null {
//     const email = localStorage.getItem('email');
//     console.log('Retrieved email:', email);
//     return email;
//   }
//   getRole(): string | null {
//     const role = localStorage.getItem('role');
//     console.log('Retrieved role:', role);
//     return role;
//   }

//   getUserId(): number | null {
//     const userIdString = localStorage.getItem('userId');
//     if (userIdString) {
//       const userId = parseInt(userIdString, 10);
//       console.log('Retrieved userId:', userId);
//       return userId;
//     }
//     return null;
//   }

//   isLoggedIn(): boolean {
//     return this.getToken() !== null;
//   }

//   forgotPassword(email: string): Observable<any> {
//     console.log('Attempting forgot password with:', email);
//     return this.http.post(`${this.apiUrl}/users/forgot-password`, { email }).pipe(
//       tap(response => console.log('Forgot password response:', response)),
//       catchError(this.handleError)
//     );
//   }

//   private handleError(error: HttpErrorResponse): Observable<never> {
//     console.error('Error occurred:', error);
//     let errorMessage = 'An unknown error occurred!';
//     if (error.error instanceof ErrorEvent) {
//       // Client-side error
//       errorMessage = `Client-side error: ${error.error.message}`;
//     } else {
//       // Server-side error
//       errorMessage = `Server error (${error.status}): ${error.message}`;
//     }
//     console.error(errorMessage);
//     return throwError(() => new Error(errorMessage));
//   }
// }
import { Injectable } from '@angular/core';
import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';

export interface LoginResponse {
  message: string;
  user: {
    id: number;         // Added user id
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
        if (response && response.token && response.user) {
          // Save token, role, user id, and email
          this.saveToken(response.token, response.user.role, response.user.id, response.user.email);
        }
      }),
      catchError(this.handleError)
    );
  }

  /**
   * Registration method: Registers a new user with the provided details.
   */
  register(
    fullName: string,
    email: string,
    password: string,
    role: string
  ): Observable<any> {
    const registerData = { fullName, email, password, role };
    console.debug('[AuthService] Attempting registration with:', registerData);

    return this.http.post(`${this.apiUrl}/users/register`, registerData).pipe(
      tap(response => console.debug('[AuthService] Registration successful:', response)),
      catchError(this.handleError)
    );
  }

  /**
   * Logout method: Clears token, role, userId, and email from localStorage.
   */
  logout(): void {
    console.debug('[AuthService] Logging out...');
    localStorage.removeItem('token');
    localStorage.removeItem('role');
    localStorage.removeItem('userId');
    localStorage.removeItem('email');
  }

  /**
   * Saves token, role, userId, and email in localStorage.
   */
  saveToken(token: string, role: string, userId?: number, email?: string): void {
    console.debug('[AuthService] Saving token, role, userId, and email:', { token, role, userId, email });
    localStorage.setItem('token', token);
    localStorage.setItem('role', role);
    if (userId !== undefined) {
      localStorage.setItem('userId', userId.toString());
    }
    if (email !== undefined) {
      localStorage.setItem('email', email);
    }
  }

  getToken(): string | null {
    const token = localStorage.getItem('token');
    console.debug('[AuthService] Retrieved token:', token);
    return token;
  }

  getEmail(): string | null {
    const email = localStorage.getItem('email');
    console.debug('[AuthService] Retrieved email:', email);
    return email;
  }

  getRole(): string | null {
    const role = localStorage.getItem('role');
    console.debug('[AuthService] Retrieved role:', role);
    return role;
  }

  getUserId(): number | null {
    const userIdString = localStorage.getItem('userId');
    if (userIdString) {
      const userId = parseInt(userIdString, 10);
      console.debug('[AuthService] Retrieved userId:', userId);
      return userId;
    }
    console.debug('[AuthService] No userId found in localStorage.');
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
    console.error('[AuthService] ', errorMessage);
    return throwError(() => new Error(errorMessage));
  }
}
