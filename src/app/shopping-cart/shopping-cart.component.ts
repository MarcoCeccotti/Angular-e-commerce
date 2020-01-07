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
}
