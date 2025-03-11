import { Component, OnInit } from '@angular/core';
import { CustomerService } from '../../services/customer.service';

@Component({
  standalone: true,
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
})
export class ProfileComponent implements OnInit {
  profile: any = {};

  constructor(private customerService: CustomerService) {}

  ngOnInit(): void {
    // Assume you have a method to get current customer ID, e.g., from a token
    const customerId = 1; // Replace with actual ID logic
    this.customerService.getCustomerById(customerId).subscribe({
      next: (data) => (this.profile = data),
      error: (err) => console.error('Profile load error', err),
    });
  }
}
