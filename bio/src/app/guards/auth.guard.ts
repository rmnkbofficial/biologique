import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from '../services/auth/auth.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router,
    private readonly authService: AuthService) { }

  canActivate() {
    if (
      this.authService.getUser()
    ) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;

    }
  }
}
