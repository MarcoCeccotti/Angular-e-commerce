import { Component, OnInit } from '@angular/core';
import { ProductsService } from '../../services/products.service';
import { ProductModel } from '../../models/product.model';
import { NavigationProductsService } from '../../services/navigation-products.service';

@Component({
    selector: 'app-products-list',
    templateUrl: './products-list.component.html',
    styleUrls: ['./products-list.component.css']
})
export class ProductsListComponent implements OnInit {

    public products: ProductModel[];

    public endedFetch: boolean;

    constructor(private productsService: ProductsService,
                private navigationProductsService: NavigationProductsService) {}

    ngOnInit(): void {
        this.endedFetch = false;
        this.fetchProducts();
    }

    fetchProducts(): void {
        this.productsService.getProducts()
                            .subscribe(response => {
                                this.products = response.payload;

                                this.checkExistingProductInEdit();

                                this.endedFetch = true;
                            },
                            error => {
                                console.log('Errore nel recupero dati: ', error);
                            });
    }

    checkExistingProductInEdit() {

        if (this.navigationProductsService.currentProduct) {

            const productFound = this.products.find(product => product.id === this.navigationProductsService.currentProduct.id);
            if (!productFound) {
                this.products.push(this.navigationProductsService.currentProduct);

            } else { // il product esiste già, devo quindi rimpiazzarlo nel vettore

                this.navigationProductsService.currentProduct.editable = this.navigationProductsService.insertingNewRow;

                for (let index = 0; index < this.products.length; index++) {

                    if (this.products[index].id === this.navigationProductsService.currentProduct.id) {
                        // rimuove l'elemento in posisizone index-esima
                        this.products.splice(index, 1);
                        // al suo posto ci inserisce l'oggetto salvato nel service
                        this.products.splice(index, 0, this.navigationProductsService.currentProduct);
                        break;
                    }
                }
            }
        }
    }

    // openConfirmationDialog() {
    //     this.dialogRef = this.dialog.open(ConfirmationDialog, {
    //       disableClose: false
    //     });
    //     this.dialogRef.componentInstance.confirmMessage = "Are you sure you want to delete?"

    //     this.dialogRef.afterClosed().subscribe(result => {
    //       if(result) {
    //         // do confirmation actions
    //       }
    //       this.dialogRef = null;
    //     });
    //   }

    // public openConfirmationDialog() {
    //     this.confirmationDialogService.confirm('Please confirm..', 'Do you really want to ... ?')
    //                                     .then((confirmed) => console.log('User confirmed:', confirmed))
    //                                     .catch(() => console.log('User dismissed the dialog (e.g., by using ESC, clicking the cross icon, or clicking outside the dialog)'));
    // }

    onDeleteRow(product: ProductModel): void {
        if (confirm('Sei sicuro di voler eliminare il prodotto ' + product.name + '?')) {
            this.productsService.deleteProduct(product)
                                .subscribe(response => {

                                    let index = 0;
                                    // controlla se il prodotto eliminato era quello corrente per il dettaglio
                                    // in caso positivo setto ad undefined il prodotto corrente
                                    for (index = 0; index < this.products.length; index++) {
                                        if (this.navigationProductsService.currentProduct && (this.products[index].id === this.navigationProductsService.currentProduct.id)) {
                                            this.navigationProductsService.currentProduct = undefined;
                                            break;
                                        } else if (this.products[index].id === response.payload) {
                                            break;
                                        }
                                    }

                                    this.products.splice(index, 1);
                                });
        }
    }

    onEditProduct(editProduct: ProductModel): void {

        this.navigationProductsService.navTab = 'detail';
        this.navigationProductsService.currentProduct = editProduct;
        this.navigationProductsService.currentProduct.editable = true;

        let index: number;
        for (index = 0; index < this.products.length; ++index) {

            if (this.products[index].id === this.navigationProductsService.currentProduct.id) {
                this.products.splice(index, 1);
                this.products.splice(index, 0, this.navigationProductsService.currentProduct);
            }
        }

        this.navigationProductsService.insertingNewRow = true;
    }

    onAddProduct(): void {
        this.navigationProductsService.currentProduct = new ProductModel();
        this.navigationProductsService.currentProduct.editable = true;
        this.products.push(this.navigationProductsService.currentProduct);

        this.navigationProductsService.insertingNewRow = true;
    }

    onSaveProduct(): void {

        this.productsService.saveProduct(this.navigationProductsService.currentProduct)
                            .subscribe(response => {
                                this.navigationProductsService.currentProduct.id = response.payload.id;
                                this.navigationProductsService.currentProduct.editable = false;
                                this.navigationProductsService.insertingNewRow = false;
                                this.navigationProductsService.navTab = 'list';
                                this.fetchProducts();
                            },
                            error => {
                                console.log('Errore nel salvataggio dati: ', error.outcome.message);
                            });
    }

    onAbort(): void {

        for (let index = 0; index < this.products.length; index++) {
            if (this.products[index].id <= 0) {

                this.products.splice(index, 1);
                this.navigationProductsService.currentProduct = undefined;

            } else {
                this.products[index].editable = false;
            }
        }

        this.navigationProductsService.insertingNewRow = false;
    }

    onCheckProduct(product: ProductModel): void {

        this.navigationProductsService.navTab = 'detail';
        this.navigationProductsService.currentProduct = product;
        this.navigationProductsService.insertingNewRow = false;
    }

    public onAddSelectedProduct(product: ProductModel): void {
        // TODO CREARE UN QUALCOSA (PRESUMO UN SERVIZIO) PER SALVARE LE RIGHE SELEZIONATE
    }
}
