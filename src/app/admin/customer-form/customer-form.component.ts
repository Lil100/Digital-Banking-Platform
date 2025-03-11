import { Component, EventEmitter, Inject, Input, OnChanges, Output } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CustomerService, Customer } from '../../services/customer.service';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
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
    public dialogRef: MatDialogRef<CustomerFormComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Customer | null
  ) {
    // Use injected data if available
    this.customer = data;
    this.customerForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      phone: ['', Validators.required],
      status: ['active', Validators.required],
    });
  }

  ngOnChanges(): void {
    if (this.customer) {
      this.customerForm.patchValue(this.customer);
    }
  }

  submitForm(): void {
    if (this.customerForm.invalid) return;
    const customerData = this.customerForm.value;
    if (this.customer) {
      // Update existing customer
      this.customerService.updateCustomer(this.customer.id, customerData).subscribe(() => {
        this.dialogRef.close(true);
      });
    } else {
      // Create new customer
      this.customerService.createCustomer(customerData).subscribe(() => {
        this.dialogRef.close(true);
      });
    }
  }
}
