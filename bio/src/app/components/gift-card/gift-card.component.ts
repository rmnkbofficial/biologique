import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GiftCardDialogComponent } from '../gift-card-dialog/gift-card-dialog.component';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  selectedDuration: number;
  constructor(private dialog: MatDialog) {}

  ngOnInit() {}

  openDialog(giftDuration: number) {
    this.selectedDuration = giftDuration;
    this.dialog.open(GiftCardDialogComponent, {
      height: '40rem',
      width: '60rem',
      disableClose: false,
      hasBackdrop: true,
      panelClass: 'dialog-container'
    });
  }
}
