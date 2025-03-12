import { Component } from '@angular/core';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { AuthService } from '../../app/auth/auth.service';
import { Router } from '@angular/router';
@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css'],
  standalone: true,
  imports: [MatToolbarModule, MatButtonModule]
})
export class HeaderComponent {

constructor(private authService: AuthService, private router: Router) {}

logout(): void {
  // Call the logout method from AuthService
  this.authService.logout();
  // Optionally navigate to the login page after logout
  this.router.navigate(['/login']);
}
}

