import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports:[CommonModule]
})
export class ProfileComponent implements OnInit {
  customer: Customer | null = null;
  error: string | null = null;

  constructor(
    private customerService: CustomerService,
    private authService: AuthService
  ) {
    console.debug('[ProfileComponent] Constructor: Component instance created.');
  }

  ngOnInit(): void {
    console.debug('[ProfileComponent] ngOnInit: Initialization started.');
    // Retrieve the user ID from AuthService (assumed stored after login)
    const userId = this.authService.getUserId();
    if (userId) {
      console.debug(`[ProfileComponent] ngOnInit: Retrieved userId: ${userId}`);
      this.customerService.getCustomerById(userId).subscribe({
        next: (data: Customer) => {
          console.debug('[ProfileComponent] Customer data fetched successfully:', data);
          this.customer = data;
        },
        error: (err) => {
          console.error('[ProfileComponent] Error fetching customer data:', err);
          this.error = 'Unable to load profile. Please try again later.';
        }
      });
    } else {
      console.error('[ProfileComponent] ngOnInit: No userId found. The user might not be logged in.');
      this.error = 'User ID not found. Please log in again.';
    }
  }
}
