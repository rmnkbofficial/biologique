import { Component, OnInit } from '@angular/core';
import { Product, LineItem } from 'src/app/models';
import { ShopifyService } from 'src/app/services/shopify/shopify.service';


@Component({
  selector: 'app-monthly-card',
  templateUrl: './monthly-card.component.html',
  styleUrls: ['./monthly-card.component.css']
})
export class MonthlyCardComponent implements OnInit {
  product: Product;

  constructor(private readonly shopifyService: ShopifyService) { }

  ngOnInit() {
    this.shopifyService.getProducts().then((products) => {
      let id;
      products.forEach(element => {
        if (element.title.includes('Tendancement Bio')) {
          id = element.id;
        }
      });
      this.shopifyService.getProductById(id).then((product) => {
        this.product = product;
      }).catch(err =>
        this.shopifyService.genericSnackBar(err));
    }, err => this.shopifyService.genericSnackBar(err));
  }

  monthlySubscribe() {
    const lineItem = new LineItem(this.product.variants[0], 1);
    this.addToCart(lineItem);
    this.shopifyService.cartOpenClose = true;
  }

  addToCart(lineItem: LineItem) {
    this.shopifyService.addItemToCart(lineItem);
  }
}
