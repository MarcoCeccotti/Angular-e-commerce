import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';
import { Router } from '@angular/router';
import { ProductsService } from '../../services/products.service';
import { NavigationProductsService } from '../../services/navigation-products.service';
import { NgForm } from '@angular/forms';

@Component({
    selector: 'app-products-detail',
    templateUrl: './products-detail.component.html',
    styleUrls: ['./products-detail.component.css'],
    encapsulation: ViewEncapsulation.None
})
export class ProductsDetailComponent implements OnInit {

    @ViewChild('f', {static: false})
    singupForm: NgForm;

    constructor(private productsService: ProductsService,
                public navigationProductsService: NavigationProductsService,
                private router: Router) {}

    ngOnInit(): void {}

    onSubmit(): void {

        this.productsService.saveProduct(this.singupForm.value)
                            .subscribe(response => {
                                this.navigationProductsService.currentProduct = undefined;
                                this.navigationProductsService.insertingNewRow = false;
                                this.navigationProductsService.navTab = 'list';
                                this.router.navigate(['/products']);
                            },
                            error => {
                                console.log('Errore nel salvataggio dati: ', error.outcome.message);
                            });
    }

    onSaveProduct(): void {

        this.productsService.saveProduct(this.navigationProductsService.currentProduct)
                            .subscribe(response => {
                                this.navigationProductsService.currentProduct = undefined;
                                this.navigationProductsService.insertingNewRow = false;
                                this.navigationProductsService.navTab = 'list';
                                this.router.navigate(['/products']);
                            },
                            error => {
                                console.log('Errore nel salvataggio dati: ', error.outcome.message);
                            });
    }

    onAbort(): void {

        this.navigationProductsService.insertingNewRow = false;

        if (this.navigationProductsService.currentProduct.id === 0) {
            this.navigationProductsService.currentProduct = undefined;
        }

        this.navigationProductsService.navTab = 'list';
        this.router.navigate(['/products']);
    }
}
