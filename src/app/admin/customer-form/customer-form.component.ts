import { Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';
import { AuthService } from '../../auth/auth.service';

@Component({
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  selector: 'app-customer-form',
  templateUrl: './customer-form.component.html',
  styleUrls: ['./customer-form.component.css'],
})
export class CustomerFormComponent implements OnChanges {
  @Input() customer: Customer | null = null;
  @Output() formSubmit = new EventEmitter<void>();

  customerForm: FormGroup;

  constructor(
    private fb: FormBuilder,
    private customerService: CustomerService,
    private authService: AuthService, // Inject AuthService
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null
  ) {
    this.customer = data;
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      address: ['', Validators.required],
      password: ['', [Validators.required, Validators.minLength(6)]],
      status: ['active', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.customer) {
      // If updating an existing customer, patch available fields.
      this.customerForm.patchValue(this.customer);
    }
  }

  submitForm(): void {
    if (this.customerForm.invalid) return;
    const customerData = this.customerForm.value;

    if (this.customer) {
      // Update existing customer (if applicable)
      this.customerService.updateCustomer(this.customer.id, {
        name: customerData.name,
        email: customerData.email,
        phone: customerData.phone,
        address: customerData.address,
        status: customerData.status,
      }).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      // For a new customer, first register them in the auth system
      this.authService.register(customerData.name, customerData.email, customerData.password, 'customer')
        .subscribe(() => {
          // Then add the customer details to your customer entity
          this.customerService.registerCustomer({
            name: customerData.name,
            email: customerData.email,
            phone: customerData.phone,
            address: customerData.address,
            status: customerData.status,
          }).subscribe(() => {
            // Close the dialog on success. No auto-login/redirection.
            this.dialogRef.close(true);
          });
        });
    }
  }
}
