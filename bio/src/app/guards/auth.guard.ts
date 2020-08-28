import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})

export class AuthGuard implements CanActivate {
  constructor(
    private readonly router: Router) { }

  canActivate() {
    if (
      JSON.parse(localStorage.getItem('user')) && JSON.parse(localStorage.getItem('user')).createdAt
    ) {
      return true;
    } else {
      this.router.navigate(['/compte']);
      return false;
    }
  }
}
