
import { Component } from '@angular/core';
import { HeaderComponent } from "../../../shared/header/header.component";
import { SidebarComponent } from "../../../shared/sidebar/sidebar.component";
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
  standalone: true,
  imports: [HeaderComponent, SidebarComponent,RouterOutlet]
})
export class DashboardComponent {}
