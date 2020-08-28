import { Component, OnInit } from '@angular/core';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  shopTitle: string;

  constructor(
    private shopifyService: ShopifyService,
    private snackbar: MatSnackBar,
    private router: Router) { }

  ngOnInit() {
    this.shopifyService.getCurrentShop().then(
      ({ model, data }) => this.shopTitle = data.shop.name, err => this.snackbar.open(
        err,
        'Ok',
        {
          duration: 6000,
          verticalPosition: 'top',
          horizontalPosition: 'right',
          politeness: 'polite',
          panelClass: 'snackbar'
        }));
  }

  openCloseCart() {
    this.shopifyService.cartOpenClose = !this.shopifyService.cartOpenClose;
  }
}
