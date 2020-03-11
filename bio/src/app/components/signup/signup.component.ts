import { Component, OnInit } from '@angular/core';

import { AuthService } from '../../services/auth/auth.service';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css', '../login/login.component.css']
})
export class SignupComponent implements OnInit {
  displayName: string;
  password: string;
  isEmailInvalid: boolean;
  firstName: string;
  lastName: string;
  constructor(public authService: AuthService) {}

  ngOnInit() {}

  signup() {
    const email = localStorage.getItem('email');
    this.authService.signUp(
      email,
      this.password,
      this.firstName,
      this.lastName
    );
  }
}
