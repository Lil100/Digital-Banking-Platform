import { Component } from '@angular/core';
import { NabbarComponent } from '../nabbar/nabbar.component';
import { SidebarComponent } from '../sidebar/sidebar.component';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-customer-dashboard',
  imports: [NabbarComponent,SidebarComponent,RouterOutlet],
  templateUrl: './customer-dashboard.component.html',
  styleUrl: './customer-dashboard.component.css'
})
export class CustomerDashboardComponent {

}
