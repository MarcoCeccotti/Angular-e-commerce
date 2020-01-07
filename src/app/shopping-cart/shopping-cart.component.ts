import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';
import { UserSession } from '../services/user-session.service';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    public selectedProducts: ProductModel[];

    constructor(private userSession: UserSession) {

      this.selectedProducts = JSON.parse(localStorage.getItem('shopping-cart-' + this.userSession.user.username));
    }

    ngOnInit(): void {}

    public removeFromShoppingCart(product: ProductModel): void {

      let index = 0;
      for (index = 0; index < this.selectedProducts.length; index++) {
        if (this.selectedProducts[index].id === product.id) {
          break;
        }
      }
      this.selectedProducts.splice(index, 1);

      localStorage.setItem('shopping-cart-' + this.userSession.user.username, JSON.stringify(this.selectedProducts));
    }
}
