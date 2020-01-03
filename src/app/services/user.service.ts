import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { WrapperResponse } from '../models/response.model';
import { loginBaseUrl } from './urls.service';
import { HttpOptions } from './http-options.service';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

    constructor(private http: HttpClient,
                private httpOptions: HttpOptions) {}

    public userInfo(username: string): Observable<WrapperResponse> {
        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('access_token', localStorage.getItem('access_token'));
        return this.http.get<WrapperResponse>(loginBaseUrl + '/user/' + username, this.httpOptions.httpOptionsProducts);
    }
}
