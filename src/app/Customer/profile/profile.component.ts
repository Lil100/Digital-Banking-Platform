import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { CommonModule } from '@angular/common';

// Define a simple interface for the user profile (adjust as needed)
export interface UserProfile {
  id: number;
  role: string;
  fullName: string;
  email: string;
  // Add other properties if needed
}

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.css'],
  imports: [CommonModule]
})
export class ProfileComponent implements OnInit {
  userProfile: UserProfile | null = null;
  error: string | null = null;
  userId: number | null = null;
  role: string | null = null;

  constructor(private authService: AuthService) {
    console.debug('[ProfileComponent] Constructor: Component instance created.');
  }

  ngOnInit(): void {
    console.debug('[ProfileComponent] ngOnInit: Initialization started.');

    // Retrieve the user ID and role from the logged-in user stored in localStorage
    this.userId = this.authService.getUserId();
    this.role = this.authService.getRole();
    console.debug(`[ProfileComponent] Retrieved userId: ${this.userId}, role: ${this.role}`);

    if (this.userId) {
      // Fetch the user profile data using the user ID via AuthService
      this.authService.getUserById(this.userId).subscribe({
        next: (data: UserProfile) => {
          console.debug('[ProfileComponent] User profile fetched successfully:', data);
          this.userProfile = data;
        },
        error: (err) => {
          console.error('[ProfileComponent] Error fetching user profile:', err);
          this.error = 'Unable to load profile. Please try again later.';
        }
      });
    } else {
      console.error('[ProfileComponent] No userId found. The user might not be logged in.');
      this.error = 'User ID not found. Please log in again.';
    }
  }
}
