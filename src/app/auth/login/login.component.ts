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
    // Auto-fill the email if "Remember Me" was previously checked
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

        // The AuthService.login() method now stores the full login response in localStorage
        const storedData = localStorage.getItem('loggedInUser');
        console.log('Stored login response:', storedData);

        // "Remember Me" logic: save or remove the email
        if (this.rememberMe) {
          localStorage.setItem('rememberEmail', this.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        // Redirect the user based on their role
        if (response.user.role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          this.router.navigate(['/customer']);
        }
      },
      error: (err) => {
        this.errorMessage = err.message || 'Login failed. Please check your credentials.';
        console.error('[LoginComponent] Login error:', err);
      },
    });
  }
}
