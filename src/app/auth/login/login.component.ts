import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService, LoginResponse } from '../auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit {
  email = '';
  password = '';
  rememberMe = false;
  errorMessage = '';

  constructor(
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // If "Remember Me" was previously checked, auto-fill the email
    const savedEmail = localStorage.getItem('rememberEmail');
    if (savedEmail) {
      this.email = savedEmail;
      this.rememberMe = true;
    }
  }

  onSubmit(): void {
    console.log('Login form submitted:', {
      email: this.email,
      password: this.password,
      rememberMe: this.rememberMe,
    });

    this.authService.login(this.email, this.password).subscribe({
      next: (response: LoginResponse) => {
        console.log('[LoginComponent] Login successful:', response);

        // The response should look like:
        // {
        //   "message": "user authenticated successfully",
        //   "user": {
        //     "id": 22,
        //     "name": "Habibi",
        //     "email": "habibi@gmail.com",
        //     "role": "CUSTOMER"
        //   },
        //   "token": "..."
        // }
        // We already store the token & role in AuthService.saveToken()
        // and store the customerId if role === 'CUSTOMER'.

        // "Remember Me" logic
        if (this.rememberMe) {
          localStorage.setItem('rememberEmail', this.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        // Redirect based on role
        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      },
      error: (err) => {
        this.errorMessage =
          err.message || 'Login failed. Please check your credentials.';
        console.error('[LoginComponent] Login error:', err);
      },
    });
  }
}
