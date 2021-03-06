import { Component, OnInit } from '@angular/core';

import { ProductModel } from '../models/product.model';

import { ProductsService } from '../services/products.service';
import { MessagesService } from '../services/messages.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

  public endedFetch: boolean;

  public fetchedProducts: ProductModel[];
  public selectedProducts: ProductModel[];

  constructor(public productService: ProductsService,
              public messagesService: MessagesService) {

    this.endedFetch = false;
    productService.shopping(false)
                  .subscribe(response => {
                    this.fetchedProducts = response.payload;
                    this.checkFetchedProducts();
                    this.endedFetch = true;
                  }, error => {
                    messagesService.message.message = error.error.outcome.message;
                    messagesService.message.type = 'alert';
                    this.endedFetch = true;
                  }
    );
  }

  ngOnInit(): void {}

  private checkFetchedProducts(): void {

    this.selectedProducts = [];
    this.fetchedProducts.forEach((fetchedProduct) => {
        let found = false;
        this.selectedProducts.forEach((selectedProduct) => {
          if (selectedProduct.id === fetchedProduct.id) {
            selectedProduct.quantity++;
            found = true;
          }
        });
        if (!found) {
          fetchedProduct.quantity = 1;
          this.selectedProducts.push(fetchedProduct);
        }
    });
  }

  public removeFromShoppingCart(product: ProductModel): void {

    this.productService.deleteShoppingItem(product, false)
                       .subscribe(response => {
                          this.removeItemFromList(response.payload);
                        }, error => {
                          this.messagesService.message.message = error.error.outcome.message;
                          this.messagesService.message.type = 'alert';
                        }
    );
  }

  private removeItemFromList(product: ProductModel): void {
    let index = 0;
    for (index = 0; index < this.selectedProducts.length; index++) {
      if (this.selectedProducts[index].id === product.id) {
        break;
      }
    }
    this.selectedProducts.splice(index, 1);
  }

  public buyProduct(product: ProductModel): void {
    this.productService.buyProduct(product, false)
                       .subscribe(response => {
                          this.removeItemFromList(product);
                          this.messagesService.message.message = 'Congratulazioni! Hai appena acquistato ' + product.quantity + ' quantità di ' + product.name;
                          this.messagesService.message.type = 'success';
                       }, error => {
                          this.messagesService.message.message = error.error.outcome.message;
                          this.messagesService.message.type = 'alert';
                       });
  }

  public buyAllProducts(products: ProductModel[]): void {
    this.productService.buyAllProducts(products, false)
                       .subscribe(response => {
                          let msg = 'Congratulazioni! Hai appena acquistato i seguenti prodotti:';
                          response.payload.forEach(product => {
                            this.removeItemFromList(product);
                            msg += ' ' + product.quantity + ' quantità di ' + product.name + ',';
                          });
                          this.messagesService.message.message = msg.substring(0, msg.length - 1);
                          this.messagesService.message.type = 'success';
                       }, error => {
                          this.messagesService.message.message = error.error.outcome.message;
                          this.messagesService.message.type = 'alert';
                       });
  }
}
