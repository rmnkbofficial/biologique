import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string;
  password: string;
  user: any;
  constructor(public authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }

  login() {
    const email = localStorage.getItem('email');
    this.authService.signIn(email, this.password);
  }
}
