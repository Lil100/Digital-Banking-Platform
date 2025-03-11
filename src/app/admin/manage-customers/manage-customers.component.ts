import { Component, OnInit } from '@angular/core';
import { CustomerService, Customer } from '../../services/customer.service';
import { MatDialog } from '@angular/material/dialog';
import { CustomerFormComponent } from '../customer-form/customer-form.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CustomerDetailsModalComponent } from "../customer-details-modal/customer-details-modal.component";

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
    this.loadCustomers();
  }

  loadCustomers(): void {
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;
    });
  }

  viewCustomer(customer: Customer): void {
    this.selectedCustomer = customer;
  }

  openCustomerForm(customer: Customer | null = null): void {
    const dialogRef = this.dialog.open(CustomerFormComponent, {
      width: '500px',
      data: customer,
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.loadCustomers();
      }
    });
  }

  closeModal(): void {
    this.selectedCustomer = null;
  }

  deactivateCustomer(id: number): void {
    if (confirm('Are you sure you want to deactivate this customer?')) {
      this.customerService.deactivateCustomer(id).subscribe(() => {
        this.loadCustomers();
      });
    }
  }

  updateCustomer(customer: Customer): void {
    this.openCustomerForm(customer);
  }
}
