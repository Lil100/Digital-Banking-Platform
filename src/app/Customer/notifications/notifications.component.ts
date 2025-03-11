import { Component, OnInit, OnDestroy } from '@angular/core';
import { NotificationService } from '../../services/notification.service';
import { Subscription, interval } from 'rxjs';
import { ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  imports:[ReactiveFormsModule,CommonModule],
  selector: 'app-notifications',
  templateUrl: './notifications.component.html',
  styleUrls: ['./notifications.component.css'],
})
export class NotificationsComponent implements OnInit, OnDestroy {
  notifications: any[] = [];
  pollingSub!: Subscription;

  constructor(private notificationService: NotificationService) {}

  ngOnInit(): void {
    this.loadNotifications();
    // Poll every 30 seconds
    this.pollingSub = interval(30000).subscribe(() => this.loadNotifications());
  }

  loadNotifications(): void {
    const customerId = 1; // Replace with actual logic
    this.notificationService.getNotifications(customerId).subscribe({
      next: (data) => (this.notifications = data),
      error: (err) => console.error('Notifications error', err),
    });
  }

  ngOnDestroy(): void {
    if (this.pollingSub) {
      this.pollingSub.unsubscribe();
    }
  }
}
