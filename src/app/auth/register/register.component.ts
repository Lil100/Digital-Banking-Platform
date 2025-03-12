import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../auth.service';
import { CustomerService } from '../../services/customer.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule, RouterModule],
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent {
  fullName = '';
  email = '';
  password = '';
  role = 'CUSTOMER'; // default role
  phone = ''; // added to capture customer phone

  errorMessage = '';
  successMessage = '';

  constructor(
    private customerService: CustomerService,
    private authService: AuthService,
    private router: Router
  ) {}

  onSubmit(): void {
    console.log('Register form submitted:', {
      fullName: this.fullName,
      email: this.email,
      password: this.password,
      role: this.role,
      phone: this.phone,
    });

    this.authService.register(this.fullName, this.email, this.password, this.role)
      .subscribe({
        next: (response) => {
          console.log('Registration response:', response);
          if (this.role === 'CUSTOMER') {
            // Also register the customer details in the customers DB
            const customerData = {
              name: this.fullName,
              email: this.email,
              phone: this.phone,
            };
            this.customerService.registerCustomer(customerData)
              .subscribe({
                next: (custResponse) => {
                  console.log('Customer DB registration successful:', custResponse);
                  this.successMessage = 'Registration successful!';
                  setTimeout(() => {
                    this.router.navigate(['/login']);
                  }, 1500);
                },
                error: (err) => {
                  console.error('Error registering in customers DB:', err);
                  this.errorMessage = err.message || 'Registration failed in customer DB.';
                }
              });
          } else {
            // Role is ADMIN, so only register in the auth system
            this.successMessage = 'Registration successful!';
            setTimeout(() => {
              this.router.navigate(['/login']);
            }, 1500);
          }
        },
        error: (err) => {
          console.error('Registration error:', err);
          this.errorMessage = err.message || 'Registration failed.';
        },
      });
  }
}
