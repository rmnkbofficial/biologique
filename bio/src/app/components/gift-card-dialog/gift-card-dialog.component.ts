import { Component, OnInit, Inject } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';
import { LineItem } from 'src/app/models';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material';

@Component({
  selector: 'app-gift-card-dialog',
  templateUrl: './gift-card-dialog.component.html',
  styleUrls: ['./gift-card-dialog.component.css']
})

export class GiftCardDialogComponent implements OnInit {
  giftForm: FormGroup;
  constructor(
    private readonly shopifyService: ShopifyService,
    public dialogRef: MatDialogRef<GiftCardDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any) {}

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.giftForm = new FormGroup({
      name: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required]),
      from: new FormControl('', [Validators.required]),
      message: new FormControl('', [Validators.required])
    });
  }

  saveGiftCard() {
    const lineItem = new LineItem(this.data, 1);
    this.addToCart(lineItem);
    this.dialogRef.close();
    this.shopifyService.cartOpenClose = true;
  }

  addToCart(lineItem: LineItem) {
    this.shopifyService.addItemToCart(lineItem);
  }
}
