import { Component, OnInit } from '@angular/core';

import { ProductsService } from '../services/products.service';
import { MessagesService } from '../services/messages.service';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-purchase',
  templateUrl: './purchase.component.html',
  styleUrls: ['./purchase.component.css']
})
export class PurchaseComponent implements OnInit {

    private fetchedProducts: ProductModel[];
    public purchasedProducts: ProductModel[];

    public endedFetch: boolean;

    constructor(public productService: ProductsService,
                public messagesService: MessagesService) {

                    this.endedFetch = false;
                    productService.shopping(true)
                                  .subscribe(response => {
                                        this.fetchedProducts = response.payload;
                                        this.checkFetchedProducts();
                                        this.endedFetch = true;
                                  }, error => {
                                        this.messagesService.message.message = 'Nessun oggetto acquistato';
                                        this.messagesService.message.type = 'success';
                                        this.endedFetch = true;
                                  });
    }

    ngOnInit(): void {}

    private checkFetchedProducts(): void {

        this.purchasedProducts = [];
        this.fetchedProducts.forEach((fetchedProduct) => {
            let found = false;
            this.purchasedProducts.forEach((selectedProduct) => {
              if (selectedProduct.id === fetchedProduct.id) {
                selectedProduct.quantity++;
                found = true;
              }
            });
            if (!found) {
              fetchedProduct.quantity = 1;
              this.purchasedProducts.push(fetchedProduct);
            }
        });
      }
}
