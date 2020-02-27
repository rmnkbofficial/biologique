import { Component, OnInit } from '@angular/core';

import { User } from '../../models/User';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-account',
  templateUrl: './account.component.html',
  styleUrls: ['./account.component.css']
})
export class AccountComponent implements OnInit {
  user: User;
  constructor(public authService: AuthService) {}

  ngOnInit() {
    this.user = JSON.parse(localStorage.getItem('user'));
  }
}
