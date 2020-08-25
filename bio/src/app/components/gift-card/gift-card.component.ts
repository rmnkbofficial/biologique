import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material';

import { GiftCardDialogComponent } from '../gift-card-dialog/gift-card-dialog.component';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';
import { Product } from 'src/app/models';

@Component({
  selector: 'app-gift-card',
  templateUrl: './gift-card.component.html',
  styleUrls: ['./gift-card.component.css']
})
export class GiftCardComponent implements OnInit {
  selectedDuration: number;
  products: Array<Product> = [];

  constructor(private dialog: MatDialog, private readonly shopifyService: ShopifyService) { }

  ngOnInit() {
    this.shopifyService.getProducts().then((products) => {
      products.forEach(element => {
        if (element.title.includes('Let\'s gift')) {
          this.products.push(element);
        }
      });
    }, err => this.shopifyService.genericSnackBar(err));
  }

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
