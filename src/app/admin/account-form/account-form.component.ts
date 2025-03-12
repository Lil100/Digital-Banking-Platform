import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnChanges,
  OnInit
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
  FormControl
} from '@angular/forms';
import { AccountService, Account } from '../../services/account.service';
import { CommonModule } from '@angular/common';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { Observable } from 'rxjs';
import { startWith, map } from 'rxjs/operators';
import { CustomerService } from '../../services/customer.service';

@Component({
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatAutocompleteModule
  ],
  selector: 'app-account-form',
  templateUrl: './account-form.component.html',
  styleUrls: ['./account-form.component.css']
})
export class AccountFormComponent implements OnInit, OnChanges {
  @Input() account: Account | null = null;
  @Output() formSubmit = new EventEmitter<void>();

  // Main reactive form
  accountForm: FormGroup;

  // Separate control for the customer autocomplete
  customerControl: FormControl = new FormControl('', Validators.required);

  // Full list of customers and the filtered subset for autocomplete
  customers: any[] = [];
  filteredCustomers!: Observable<any[]>;

  constructor(
    private fb: FormBuilder,
    private accountService: AccountService,
    private customerService: CustomerService
  ) {
    // Initialize form fields
    this.accountForm = this.fb.group({
      // For new accounts, user can type accountNumber; for existing, it’s patched in
      accountNumber: ['', [Validators.minLength(1)]],
      // We'll store the entire customer object here, but only send customerId to the backend
      customer: [null, Validators.required],
      accountType: ['', Validators.required],
      balance: [0, [Validators.required, Validators.min(0)]],
      status: ['ACTIVE']
    });
  }

  ngOnInit(): void {
    // Load all customers for the autocomplete
    this.customerService.getCustomers().subscribe((data) => {
      this.customers = data;

      // Setup autocomplete filtering
      this.filteredCustomers = this.customerControl.valueChanges.pipe(
        startWith(''),
        map((value) => (typeof value === 'string' ? value : value?.name)),
        map((name) =>
          name ? this._filterCustomers(name) : this.customers.slice()
        )
      );
    });
  }

  ngOnChanges(): void {
    // If editing an existing account, patch the form with current values
    if (this.account) {
      this.accountForm.patchValue(this.account);

      // Also set the customerControl if we have a matching customer ID
      // (Assuming you have an ID on the customer objects as well)
      const matchingCustomer = this.customers.find(
        (c) => c.id === this.account?.customerId
      );
      if (matchingCustomer) {
        this.customerControl.setValue(matchingCustomer);
      }
    }
  }

  // Filter function for the autocomplete
  private _filterCustomers(name: string): any[] {
    const filterValue = name.toLowerCase();
    return this.customers.filter((customer) =>
      customer.name.toLowerCase().includes(filterValue)
    );
  }

  // Display function in the autocomplete dropdown
  displayCustomer(customer: any): string {
    return customer && customer.name ? customer.name : '';
  }

  // When a customer is selected from the dropdown, patch the form
  onCustomerSelected(customer: any): void {
    this.accountForm.patchValue({ customer });
  }

  // Final submission
  submitForm(): void {
    if (this.accountForm.invalid) {
      console.warn('[AccountFormComponent] Form invalid, cannot submit');
      return;
    }

    // Extract form data
    const accountData = { ...this.accountForm.value };

    // The backend expects customerId, so map 'accountData.customer.id' to 'accountData.customerId'
    if (accountData.customer && accountData.customer.id) {
      accountData.customerId = accountData.customer.id;
      delete accountData.customer; // Remove the entire customer object
    } else {
      console.error('[AccountFormComponent] No valid customer selected');
      return;
    }

    // If we are editing an existing account, call update; else, create a new one
    if (this.account) {
      this.accountService.updateAccount(this.account.id, accountData).subscribe({
        next: () => this.formSubmit.emit(),
        error: (err) => console.error('[AccountFormComponent] Update error:', err)
      });
    } else {
      // Create new account
      this.accountService.createAccount(accountData).subscribe({
        next: () => this.formSubmit.emit(),
        error: (err) => console.error('[AccountFormComponent] Create error:', err)
      });
    }
  }
}
