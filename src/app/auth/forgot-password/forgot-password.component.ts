import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-forgot-password',
  templateUrl: './forgot-password.component.html',
  styleUrls: ['./forgot-password.component.css'],
})
export class ForgotPasswordComponent {
  email = '';
  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService) {}

  onSubmit(): void {
    console.log('Forgot password form submitted for email:', this.email);

    this.authService.forgotPassword(this.email).subscribe({
      next: (response) => {
        this.successMessage = 'Password reset instructions sent!';
        console.log('Forgot password response:', response);
      },
      error: (err) => {
        this.errorMessage = err.message || 'Error sending reset instructions.';
        console.error('Forgot password error:', err);
      },
    });
  }
}
