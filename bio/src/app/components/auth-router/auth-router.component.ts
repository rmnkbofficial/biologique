import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-auth-router',
  templateUrl: './auth-router.component.html',
  styleUrls: ['./auth-router.component.css']
})
export class AuthRouterComponent implements OnInit {
  emailForm: FormGroup;
  constructor(private authService: AuthService, private router: Router) {
    this.createForm();
  }

  ngOnInit() {
    if (JSON.parse(localStorage.getItem('user'))) {
      this.router.navigate(['mon-compte']);
    }
  }

  createForm() {
    this.emailForm = new FormGroup({
      email: new FormControl('', [Validators.required])
    });
  }

  checkEmailExists(email: string) {
    this.authService.accountExists(email).subscribe(doc => {
      if (doc[0]) {
        localStorage.setItem('user', JSON.stringify(doc[0]));
        this.router.navigate(['login']);
      } else {
        this.router.navigate(['signup']);
      }
    });
  }
}
