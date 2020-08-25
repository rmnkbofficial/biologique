import { Component, OnInit } from '@angular/core';
import { Product, LineItem } from 'src/app/models';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';

@Component({
  selector: 'app-yearly-card',
  templateUrl: './yearly-card.component.html',
  styleUrls: [
    './yearly-card.component.css',
    '../monthly-card/monthly-card.component.css'
  ]
})
export class YearlyCardComponent implements OnInit {
  product: Product;

  constructor(private readonly shopifyService: ShopifyService) { }

  ngOnInit() {
    this.shopifyService.getProducts().then((products) => {
      let id;
      products.forEach(element => {
        if (element.title.includes('Annuellement Bio')) {
          id = element.id;
        }
      });
      this.shopifyService.getProductById(id).then((product) => {
        this.product = product;
        console.log(this.product, this.product.variants[0]);
      }).catch(err =>
        this.shopifyService.genericSnackBar(err));
    }, err => this.shopifyService.genericSnackBar(err));
  }

 yearlySubscribe() {
    const lineItem = new LineItem(this.product.variants[0], 1);
    this.addToCart(lineItem);
    this.shopifyService.cartOpenClose = true;
  }

  addToCart(lineItem: LineItem) {
    this.shopifyService.addItemToCart(lineItem);
  }
}
