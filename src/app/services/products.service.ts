import { Injectable } from '@angular/core';
import { ProductModel } from '../models/product.model';

import { productBaseUrl } from './urls.service';

import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { WrapperResponse } from '../models/response.model';
import { HttpOptions } from './http-options.service';

@Injectable({
    providedIn: 'root'
})
export class ProductsService {

    constructor(private http: HttpClient,
                private httpOptions: HttpOptions) {}

    getProducts(): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return this.http.get<WrapperResponse>(productBaseUrl + '/all', this.httpOptions.httpOptionsProducts);
    }

    getProduct(id: number): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return this.http.get<WrapperResponse>(productBaseUrl + '/' + id, this.httpOptions.httpOptionsProducts);
    }

    saveProduct(product: ProductModel): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return this.http.post<WrapperResponse>(productBaseUrl + '/save', product, this.httpOptions.httpOptionsProducts);
    }

    deleteProduct(product: ProductModel): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        return this.http.delete<WrapperResponse>(productBaseUrl + '/delete/' + product.id, this.httpOptions.httpOptionsProducts);
    }
}
