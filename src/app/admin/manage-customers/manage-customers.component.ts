import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerDetailsModalComponent } from '../customer-details-modal/customer-details-modal.component';

@Component({
  standalone: true,
  imports: [FormsModule, CommonModule, ReactiveFormsModule, CustomerDetailsModalComponent],
  selector: 'app-manage-customers',
  templateUrl: './manage-customers.component.html',
  styleUrls: ['./manage-customers.component.css'],
})
export class ManageCustomersComponent implements OnInit {
  customers: Customer[] = [];
  selectedCustomer: Customer | null = null;

  constructor(private customerService: CustomerService, private dialog: MatDialog) {}

  ngOnInit(): void {
    console.log('[ManageCustomersComponent] OnInit -> loading customers...');
    this.loadCustomers();
  }

  loadCustomers(): void {
    console.log('[ManageCustomersComponent] loadCustomers() called');
    this.customerService.getCustomers().subscribe({
      next: (data) => {
        console.log('[ManageCustomersComponent] Received customers:', data);
        this.customers = data;
      },
      error: (err) => {
        console.error('[ManageCustomersComponent] Error fetching customers:', err);
      },
    });
  }

  viewCustomer(customer: Customer): void {
    console.log('[ManageCustomersComponent] viewCustomer() ->', customer);
    this.selectedCustomer = customer;
  }

  openCustomerForm(customer: Customer | null = null): void {
    console.log('[ManageCustomersComponent] openCustomerForm() ->', customer);
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '500px',
      data: customer,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        console.log('[ManageCustomersComponent] Dialog closed -> reloading customers');
        this.loadCustomers();
      }
    });
  }

  closeModal(): void {
    console.log('[ManageCustomersComponent] closeModal()');
    this.selectedCustomer = null;
  }

  deactivateCustomer(id: number): void {
    if (confirm('Are you sure you want to deactivate this customer?')) {
      console.log('[ManageCustomersComponent] deactivateCustomer() ->', id);
      this.customerService.deactivateCustomer(id).subscribe({
        next: () => {
          console.log('[ManageCustomersComponent] Customer deactivated -> reloading customers');
          this.loadCustomers();
        },
        error: (err) => {
          console.error('[ManageCustomersComponent] Error deactivating customer:', err);
        },
      });
    }
  }

  updateCustomer(customer: Customer): void {
    console.log('[ManageCustomersComponent] updateCustomer() ->', customer);
    this.openCustomerForm(customer);
  }
}
