import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

import { productBaseUrl } from './urls.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapperResponse } from '../models/response.model';
import { HttpOptions } from './http-options.service';
import { UserSession } from './user-session.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private userSession: UserSession,
                private http: HttpClient,
                private httpOptions: HttpOptions) {}

    public getProducts(): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return this.http.get<WrapperResponse>(productBaseUrl + '/all', this.httpOptions.httpOptionsProducts);
    }

    public getProduct(id: number): Observable<WrapperResponse> {
        return this.http.get<WrapperResponse>(productBaseUrl + '/' + id, this.httpOptions.httpOptionsProducts);
    }

    public saveProduct(product: ProductModel): Observable<WrapperResponse> {
        return this.http.post<WrapperResponse>(productBaseUrl + '/save', product, this.httpOptions.httpOptionsProducts);
    }

    public deleteProduct(product: ProductModel): Observable<WrapperResponse> {
        return this.http.delete<WrapperResponse>(productBaseUrl + '/delete/' + product.id, this.httpOptions.httpOptionsProducts);
    }

    public shopping(bought: boolean): Observable<WrapperResponse> {
        return this.http.get<WrapperResponse>(productBaseUrl + '/shopping/' + this.userSession.user.username + '/' + bought, this.httpOptions.httpOptionsProducts);
    }

    public newShoppingItem(product: ProductModel, bought: boolean): Observable<WrapperResponse> {
        return this.http.post<WrapperResponse>(productBaseUrl + '/shopping/new/' + this.userSession.user.username + '/' + bought, product, this.httpOptions.httpOptionsProducts);
    }

    public deleteShoppingItem(product: ProductModel, bought: boolean): Observable<WrapperResponse> {
        return this.http.post<WrapperResponse>(productBaseUrl + '/shopping/delete/' + this.userSession.user.username + '/' + bought, product, this.httpOptions.httpOptionsProducts);
    }

    public buyProduct(product: ProductModel, bought: boolean): Observable<WrapperResponse> {
        return this.http.post<WrapperResponse>(productBaseUrl + '/shopping/buy/' + this.userSession.user.username + '/' + bought, product, this.httpOptions.httpOptionsProducts);
    }

    public buyAllProducts(products: ProductModel[], bought: boolean): Observable<WrapperResponse> {
        return this.http.post<WrapperResponse>(productBaseUrl + '/shopping/buy-all/' + this.userSession.user.username + '/' + bought, products, this.httpOptions.httpOptionsProducts);
    }
}
