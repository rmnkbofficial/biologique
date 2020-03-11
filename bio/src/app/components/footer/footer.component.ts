import { Component, OnInit } from '@angular/core';
import { MatDialog, MatSnackBar } from '@angular/material';

import { FirebaseService } from '../../services/firebase/firebase.service';
import { GiftCardRedeemComponent } from '../gift-card-redeem/gift-card-redeem.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  currentYear = new Date().getFullYear();
  email: string;
  checked = false;
  constructor(
    public dialog: MatDialog,
    private firebaseService: FirebaseService,
    private snackbar: MatSnackBar
  ) {}

  ngOnInit() {}

  openDialog() {
    this.dialog.open(GiftCardRedeemComponent, {
      height: '40rem',
      width: '60rem',
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'dialog-container'
    });
  }

  check() {
    this.checked = !this.checked;
  }

  submit() {
    if (this.checked) {
      this.firebaseService.submitEmail(this.email).then(res => {
        if (res.id) {
          this.snackbar.open(`Thanks, we'll be in touch soon.`, 'Ok', {
            duration: 5000,
            verticalPosition: 'top',
            horizontalPosition: 'end',
            politeness: 'polite',
            panelClass: 'snackbar'
          });
        } else {
          this.snackbar.open(
            `Uh oh. Something went wrong. Please try again later.`,
            'Ok',
            {
              duration: 5000,
              verticalPosition: 'top',
              horizontalPosition: 'end',
              politeness: 'polite',
              panelClass: 'snackbar'
            }
          );
        }
      });
    } else {
      this.snackbar.open(`Please accept the terms and conditions.`, 'Ok', {
        duration: 5000,
        verticalPosition: 'top',
        horizontalPosition: 'end',
        politeness: 'polite',
        panelClass: 'snackbar'
      });
    }
  }
}
