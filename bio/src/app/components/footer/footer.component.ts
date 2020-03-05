import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GiftCardRedeemComponent } from '../gift-card-redeem/gift-card-redeem.component';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {
  constructor(public dialog: MatDialog) {}

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
}
