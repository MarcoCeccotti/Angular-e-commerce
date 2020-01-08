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

  public selectedProducts: ProductModel[];

  constructor(public productService: ProductsService,
              public messagesService: MessagesService) {

    this.endedFetch = false;
    productService.shopping(false)
                  .subscribe(response => {
                    this.selectedProducts = response.payload;
                    this.endedFetch = true;
                  }, error => {
                    messagesService.message.message = error.error.outcome.message;
                    messagesService.message.type = 'alert';
                    this.endedFetch = true;
                  }
    );
  }

  ngOnInit(): void {}

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
}
