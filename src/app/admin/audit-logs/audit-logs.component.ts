import { Component, OnInit } from '@angular/core';
import { AuditService, AuditLog } from '../../services/audit.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';

@Component({
  standalone: true,
  selector: 'app-audit-logs',
  templateUrl: './audit-logs.component.html',
  styleUrls: ['./audit-logs.component.css'],
  imports: [FormsModule,CommonModule]
})
export class AuditLogsComponent implements OnInit {
  logs: AuditLog[] = [];
  searchQuery: string = '';

  constructor(private auditService: AuditService) {}

  ngOnInit(): void {
    this.loadLogs();
  }

  loadLogs(): void {
    this.auditService.getAuditLogs(this.searchQuery).subscribe(data => {
      this.logs = data;
    });
  }

  onSearch(): void {
    this.loadLogs();
  }
}
