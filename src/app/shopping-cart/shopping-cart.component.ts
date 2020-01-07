import { Component, OnInit } from '@angular/core';
import { ProductModel } from '../models/product.model';

@Component({
  selector: 'app-shopping-cart',
  templateUrl: './shopping-cart.component.html',
  styleUrls: ['./shopping-cart.component.css']
})
export class ShoppingCartComponent implements OnInit {

    public selectedProducts: ProductModel[];

    constructor() {
        // TODO DOVREI RICOSTRUIRE IL VETTORE DEGLI ELEMENTI SELEZIONATI DALL'UTENTE

        // TODO SALVO NEL LocalStorage TUTTI I PRODOTTI SELEZIONATI, RECUPERANDOLI QUINDI DA QUI OGNI VOLTA
        // TODO CAPIRE QUINDI COME FARE A SALVARE UN VETTORE NEL LocalStorage
    }

    ngOnInit(): void {}
}
