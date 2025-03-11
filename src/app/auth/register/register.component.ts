import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullName = '';
  lName = '';
  email = '';
  password = '';
  role = 'CUSTOMER'; // default role

  errorMessage = '';
  successMessage = '';

  constructor(private authService: AuthService, private router: Router) {}

  onSubmit(): void {
    console.log('Register form submitted:', {
      fName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role,
    });

    this.authService
      .register(this.fullName, this.email, this.password, this.role)
      .subscribe({
        next: (response) => {
          this.successMessage = 'Registration successful!';
          console.log('Registration response:', response);

          // Optionally, redirect to login after successful registration
          setTimeout(() => {
            this.router.navigate(['/login']);
          }, 1500);
        },
        error: (err) => {
          this.errorMessage = err.message || 'Registration failed.';
          console.error('Registration error:', err);
        },
      });
  }
}
