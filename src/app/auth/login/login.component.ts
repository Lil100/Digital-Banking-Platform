import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  email = '';
  password = '';
  rememberMe = false; // For "Remember Me" option
  errorMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

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
      next: (response) => {
        // Typically, you'd get a token and role from the response
        const { token, role } = response;
        // Save token & role in localStorage
        this.authService.saveToken(token, role);

        // If "Remember Me" is checked, store the email
        if (this.rememberMe) {
          localStorage.setItem('rememberEmail', this.email);
        } else {
          localStorage.removeItem('rememberEmail');
        }

        // Redirect based on role
        if (role === 'ADMIN') {
          this.router.navigate(['/admin']);
        } else {
          // Default to CUSTOMER or other roles
          this.router.navigate(['/customer']);
        }
      },
      error: (err) => {
        this.errorMessage =
          err.message || 'Login failed. Please check your credentials.';
        console.error('Login error:', err);
      },
    });
  }
}
