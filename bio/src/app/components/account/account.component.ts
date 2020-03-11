import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { MatSnackBar } from '@angular/material';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth/auth.service';
import { FirebaseService } from '../../services/firebase/firebase.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  isEditMode = false;
  detailsForm: FormGroup;
  firstName: string;
  lastName: string;
  newUser: User;
  constructor(
    public authService: AuthService,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
    this.newUser = this.firebaseService.getUserInfoById(this.user.uid)[0];
    localStorage.setItem('user', JSON.stringify(this.newUser));
    this.createForm();
  }

  createForm() {
    this.detailsForm = new FormGroup({
      firstName: new FormControl(this.user.firstName, [Validators.required]),
      lastName: new FormControl(this.user.lastName, [Validators.required]),
      email: new FormControl(this.user.email, [Validators.required])
    });
  }

  updateUserInfo() {
    if (
      this.detailsForm.controls.firstName.value !== '' &&
      this.detailsForm.controls.lastName.value !== '' &&
      this.detailsForm.controls.email.value !== ''
    ) {
      this.user.displayName = `${this.detailsForm.controls.firstName.value} ${this.detailsForm.controls.lastName.value}`;
      this.user.email = this.detailsForm.controls.email.value;
      this.authService.setUserData(this.user);

      this.firebaseService.setUserData(
        this.user,
        this.detailsForm.controls.firstName.value,
        this.detailsForm.controls.lastName.value
      );

      this.isEditMode = false;
      this.firebaseService.getUserInfoById(this.user.uid).subscribe(doc => {
        this.newUser = doc[0];
        localStorage.setItem('user', JSON.stringify(this.newUser));
        this.user = this.newUser;
      });
    } else {
      this.snackbar.open(
        `Please fill in all fields or else hit "Close".`,
        'Ok',
        {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          politeness: 'polite',
          panelClass: 'snackbar'
        }
      );
    }
  }
}
