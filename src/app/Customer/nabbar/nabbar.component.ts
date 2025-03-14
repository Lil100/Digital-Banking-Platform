import { Component, OnInit, OnDestroy } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { interval, Subscription } from 'rxjs';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-nabbar',
  imports: [CommonModule],
  templateUrl: './nabbar.component.html',
  styleUrls: ['./nabbar.component.css']
})
export class NabbarComponent implements OnInit, OnDestroy {
  userRole: string = '';
  currentDateTime: Date = new Date();
  private subscription!: Subscription;

  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit(): void {
    // Retrieve the user role from AuthService; fallback to 'Customer' if not found.
    this.userRole = this.authService.getRole() || 'Customer';
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
