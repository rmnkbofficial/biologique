import { Subscription } from 'rxjs';
import { filter } from 'rxjs/operators';

import { animate, style, transition, trigger } from '@angular/animations';
import { Component, OnInit } from '@angular/core';
import { MatDialogRef, MatSnackBar } from '@angular/material';
import { NavigationStart, Router, RouterEvent } from '@angular/router';

import { AuthService } from '../../services/auth.service';

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
