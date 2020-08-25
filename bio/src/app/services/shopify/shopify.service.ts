import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Cart, LineItem, Product } from 'src/app/models';
import { BehaviorSubject } from 'rxjs';
import GraphQLJSClient from 'graphql-js-client';
import typeBundle from './types';
import { MatSnackBar } from '@angular/material';

@Injectable({
  providedIn: 'root'
})

export class ShopifyService {
  cartObs: BehaviorSubject<Cart> = new BehaviorSubject(new Cart());
  lineItemsObs: BehaviorSubject<LineItem[]> = new BehaviorSubject([]);
  newlineItemObs: BehaviorSubject<LineItem> = new BehaviorSubject(null);
  cartOpenCloseObs: BehaviorSubject<boolean> = new BehaviorSubject(false);
  varientIdList = [];
  titleList = [];

  client = new GraphQLJSClient(typeBundle, {
    url: environment.shopify.url,
    fetcherOptions: {
      headers: {
        'X-Shopify-Storefront-Access-Token': environment.shopify.shopifyaccesstoken,
      }
    }
  });

  constructor(
    private readonly http: HttpClient, private snackbar: MatSnackBar
  ) {
    const cart = new Cart();
    this.cartObs.next(cart);
  }

  get cart() {
    return this.cartObs.getValue();
  }

  set cart(cart) {
    this.cartObs.next(cart);
  }

  get cartOpenClose() {
    return this.cartOpenCloseObs.getValue();
  }

  set cartOpenClose(value: boolean) {
    this.client = new GraphQLJSClient(typeBundle, {
      url: environment.shopify.url,
      fetcherOptions: {
        headers: {
          'X-Shopify-Storefront-Access-Token': environment.shopify.shopifyaccesstoken,
        }
      }
    });
    this.cartOpenCloseObs.next(value);
  }

  addItemToCart(lineItem: LineItem) {
    const lineItems = this.lineItemsObs.getValue();
    const sameVariant = lineItems.filter(item => item.variant === lineItem.variant);
    if (sameVariant.length) {
      sameVariant[0].quantity = sameVariant[0].quantity + lineItem.quantity;
      this.lineItemsObs.next(lineItems);
    } else {
      this.newlineItemObs.next(lineItem);
    }
  }

  removeItem(lineItem) {
    const lineItems = this.lineItemsObs.getValue();
    const index = lineItems.indexOf(lineItem);
    if (index !== -1) {
      lineItems.splice(index, 1);
      this.lineItemsObs.next(lineItems);
    }
  }

  getCurrentShop(): Promise<any> {
    const client = this.client;
    const query = client.query((root) => {
      root.add('shop', (shop) => {
        shop.add('name');
      });
    });
    return client.send(query);
  }

  getProductById(id): Promise<Product> {
    const client = this.client;
    const query = client.query((root) => {
      root.add('node', { args: { id }, alias: 'product' }, (node) => {
        node.add('id');
        node.addInlineFragmentOn('Product', (Product) => {
          Product.add('title');
          Product.add('createdAt');
          Product.add('description');
          Product.add('productType');
          Product.add('publishedAt');
          Product.add('tags');
          Product.add('updatedAt');
          Product.add('vendor');
          Product.addConnection('images', { args: { first: 250 } }, (images) => {
            images.add('src');
            images.add('id');
            images.add('altText');
          });
          Product.addConnection('variants', { args: { first: 250 } }, (variants) => {
            variants.add('id');
            variants.add('product');
            variants.add('title');
            variants.add('price');
            variants.add('image', (image) => {
              image.add('src');
              image.add('id');
              image.add('altText');
            });
          });
        });
      });
    });

    return client.send(query).then(({ model, data }) => {
      this.setIdTitleHandler(data);
      return client.fetchAllPages(model.product, { pageSize: 250 });
    });
  }

  setIdTitleHandler(data) {
    data.product.variants.edges.forEach(element => {
      this.varientIdList.push(element.node.id);
      this.titleList.push(data.product.title);
    });
  }

  getTitelById(id) {
    let title;
    this.varientIdList.forEach((element, index) => {
      if (id === element) {
        title = this.titleList[index];
      }
    });
    return title;
  }

  getProducts(): Promise<Product[]> {
    const query = this.client.query((root) => {
      root.add('shop', (shop) => {
        shop.addConnection('products', { args: { first: 250 } }, (products) => {
          products.add('id');
          products.add('title');
          products.addConnection('images', { args: { first: 250 } }, (images) => {
            images.add('src');
            images.add('id');
            images.add('altText');
          });
        });
      });
    });

    return this.client.send(query).then(({ model, data }) => {
      return this.client.fetchAllPages(model.shop.products, { pageSize: 20 });
    });
  }

  // tslint:disable-next-line: variable-name
  createCheckout(_lineItems): Promise<any> {
    // tslint:disable-next-line: variable-name
    const _lineItemsForCheckout = _lineItems.map(item => {
      return { variantId: item.variantId, quantity: item.quantity }
    });
    const input = this.client.variable('input', 'CheckoutCreateInput!');
    const mutation = this.client.mutation('myMutation', [input], (root) => {
      root.add('checkoutCreate', { args: { input } }, (checkoutCreate) => {
        checkoutCreate.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        })
        checkoutCreate.add('checkout', (checkout) => {
          checkout.add('id'),
            checkout.add('webUrl'),
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {

              lineItems.add('variant', (variant) => {
                variant.add('title');
              }),
                lineItems.add('quantity');
            }
            )
        })
      })
    })
    return this.client.send(mutation, { input: { lineItems: _lineItemsForCheckout } });
  }

  // tslint:disable-next-line: variable-name
  fetchCheckout(_checkoutid): Promise<any> {
    const id = this.client.variable('checkoutId', 'ID!');
    const query = this.client.query((root) => {
      root.add('node', { args: { id: _checkoutid }, alias: 'checkout' }, (node) => {
        node.add('id');
        node.addInlineFragmentOn('Checkout', (Checkout) => {
          Checkout.add('webUrl');
          Checkout.add('subtotalPrice'),
            Checkout.add('totalTax'),
            Checkout.add('totalPrice'),
            Checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price');
              }),
                lineItems.add('quantity');
            });
        });
      });
    });

    return this.client.send(query, { checkoutId: _checkoutid })
  }

  // tslint:disable-next-line: variable-name
  addVariantsToCheckout(_checkoutid, _lineItems): Promise<any> {
    const checkoutId = this.client.variable('checkoutId', 'ID!');
    // tslint:disable-next-line: variable-name
    const _lineItemsForCheckout = _lineItems.map(item => {
      return { id: item.id, variantId: item.variantId, quantity: item.quantity }
    });
    const lineItems = this.client.variable('lineItems', '[CheckoutLineItemInput!]!');
    const mutation = this.client.mutation('myMutation', [checkoutId, lineItems], (root) => {
      root.add('checkoutLineItemsAdd', { args: { checkoutId, lineItems } }, (checkoutLineItemsAdd) => {
        checkoutLineItemsAdd.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        });

        checkoutLineItemsAdd.add('checkout', (checkout) => {
          checkout.add('webUrl'),
            checkout.add('subtotalPrice'),
            checkout.add('totalTax'),
            checkout.add('totalPrice'),
            // tslint:disable-next-line: no-shadowed-variable
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price');
              }),
                lineItems.add('quantity');
            });
        });
      });
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItems: _lineItemsForCheckout });
  }

  // tslint:disable-next-line: variable-name
  removeLineItem(_checkoutid, _lineItemId): Promise<any> {
    const checkoutId = this.client.variable('checkoutId', 'ID!');
    const lineItemIds = this.client.variable('lineItemIds', '[ID!]!');
    const mutation = this.client.mutation('myMutation', [checkoutId, lineItemIds], (root) => {
      root.add('checkoutLineItemsRemove', { args: { checkoutId, lineItemIds } }, (checkoutLineItemsRemove) => {
        checkoutLineItemsRemove.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        }),
          checkoutLineItemsRemove.add('checkout', (checkout) => {
            checkout.add('webUrl'),
              checkout.add('subtotalPrice'),
              checkout.add('totalTax'),
              checkout.add('totalPrice'),
              checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
                lineItems.add('variant', (variant) => {
                  variant.add('title'),
                    variant.add('image', (image) => image.add('src')),
                    variant.add('price');
                }),
                  lineItems.add('quantity');
              });
          });
      });
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItemIds: [_lineItemId] });

  }

  // tslint:disable-next-line: variable-name
  updateLineItem(_checkoutid, _lineItems): Promise<any> {
    // tslint:disable-next-line: variable-name
    const _lineItemsForCheckout = _lineItems.map(item => {
      return { id: item.id, variantId: item.variantId, quantity: item.quantity }
    });
    const checkoutId = this.client.variable('checkoutId', 'ID!');
    const lineItems = this.client.variable('lineItems', '[CheckoutLineItemUpdateInput!]!');
    const mutation = this.client.mutation('myMutation', [checkoutId, lineItems], (root) => {
      root.add('checkoutLineItemsUpdate', { args: { checkoutId, lineItems } }, (checkoutLineItemsUpdate) => {
        checkoutLineItemsUpdate.add('userErrors', (userErrors) => {
          userErrors.add('message'),
            userErrors.add('field');
        });
        checkoutLineItemsUpdate.add('checkout', (checkout) => {
          checkout.add('webUrl'),
            checkout.add('subtotalPrice'),
            checkout.add('totalTax'),
            checkout.add('totalPrice'),
            // tslint:disable-next-line: no-shadowed-variable
            checkout.addConnection('lineItems', { args: { first: 250 } }, (lineItems) => {
              lineItems.add('variant', (variant) => {
                variant.add('title'),
                  variant.add('image', (image) => image.add('src')),
                  variant.add('price');
              }),
                lineItems.add('quantity');
            });
        });
      });
    });

    return this.client.send(mutation, { checkoutId: _checkoutid, lineItems: _lineItemsForCheckout });
  }

  genericSnackBar(data) {
    this.snackbar.open(
      data,
      'Ok',
      {
        duration: 6000,
        verticalPosition: 'top',
        horizontalPosition: 'right',
        politeness: 'polite',
        panelClass: 'snackbar'
      }
    );
  }
}
