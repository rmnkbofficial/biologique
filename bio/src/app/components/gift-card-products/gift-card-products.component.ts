import { Component, OnInit, Input } from '@angular/core';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';
import { Product } from 'src/app/models';
import { FormGroup, FormControl } from '@angular/forms';
import { MatDialog } from '@angular/material';
import { GiftCardDialogComponent } from '../gift-card-dialog/gift-card-dialog.component';

@Component({
  selector: 'app-gift-card-products',
  templateUrl: './gift-card-products.component.html',
  styleUrls: ['./gift-card-products.component.css']
})
export class GiftCardProductsComponent implements OnInit {

  @Input() productInput: Product;
  product: Product;
  form;

  constructor(private readonly shopifyService: ShopifyService, private dialog: MatDialog) { }

  ngOnInit() {
    this.createForm();
    this.shopifyService.getProductById(this.productInput.id).then((product) => {
      this.product = product;
      this.form.get('variant').setValue(this.product.variants[0]);
    }).catch(err =>
      this.shopifyService.genericSnackBar(err));
  }

  createForm() {
    this.form = new FormGroup({
      variant: new FormControl([]),
      quantity: new FormControl(1),
    });
  }

  openDialog() {
    this.dialog.open(GiftCardDialogComponent, {
      height: '40rem',
      width: '60rem',
      disableClose: false,
      data: this.form.value.variant,
      hasBackdrop: true,
      panelClass: 'dialog-container'
    });
  }

  getLocalPathByDescription(description) {
    if (description === '6 months') {
      return 'url(../../../assets/gift-card-6.jpeg)';
    } else if (description === '3 months') {
      return 'url(../../../assets/gift-card-3.jpg)';
    } else if (description === '12 months') {
      return 'url(../../../assets/banner.png)';
    }
  }
}
