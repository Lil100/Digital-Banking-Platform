import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

export interface AuditLog {
  id: number;
  action: string;
  timestamp: string;
  user: string;
  details: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuditService {
  private apiUrl = '/api/audit/logs';

  constructor(private http: HttpClient) {}

  getAuditLogs(query: string = ''): Observable<AuditLog[]> {
    // Append query parameter if provided
    const url = query ? `${this.apiUrl}?q=${query}` : this.apiUrl;
    return this.http.get<AuditLog[]>(url);
  }
}
