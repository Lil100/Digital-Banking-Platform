import { Injectable, inject } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class CustomerGuard implements CanActivate {
  private authService = inject(AuthService);
  private router = inject(Router);

  canActivate(): boolean {
    const role = this.authService.getRole();
    if (this.authService.isLoggedIn() && role === 'CUSTOMER') {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}
