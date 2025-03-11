import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface Notification {
  id: number;
  message: string;
  timestamp: string;
}

@Injectable({
  providedIn: 'root'
})
export class NotificationService {
  private apiUrl = '/api/notifications';

  constructor(private http: HttpClient) {}

  // Get notifications for a specific customer
  getNotifications(customerId: number): Observable<Notification[]> {
    return this.http.get<Notification[]>(`${this.apiUrl}/${customerId}`);
  }
}
