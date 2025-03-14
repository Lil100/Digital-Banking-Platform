import { Component, OnInit, OnDestroy } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../app/auth/auth.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule,CommonModule, MatButtonModule]
})
export class HeaderComponent implements OnInit, OnDestroy {
  userRole: string = '';
  currentDateTime: Date = new Date();
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the user's role from the AuthService; fallback to 'User' if not set.
    this.userRole = this.authService.getRole() || 'User';
    // Update the date/time every second.
    this.subscription = interval(1000).subscribe(() => {
      this.currentDateTime = new Date();
    });
  }

  ngOnDestroy(): void {
    if (this.subscription) {
      this.subscription.unsubscribe();
    }
  }

  logout(): void {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
