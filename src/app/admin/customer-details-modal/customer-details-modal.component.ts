import { Component, Input } from '@angular/core';
import { Customer } from '../../services/customer.service';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports: [CommonModule],
  selector: 'app-customer-details-modal',
  templateUrl: './customer-details-modal.component.html',
  styleUrls: ['./customer-details-modal.component.css']
})
export class CustomerDetailsModalComponent {
  @Input() customer!: Customer;

  closeModal(): void {
    // Optionally, you could emit an event here instead of resetting the customer.
    // For now, we clear the customer object to hide the modal.
    this.customer = {} as Customer;
  }
}
