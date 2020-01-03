import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { LoginModel } from '../models/login.model';
import { WrapperResponse } from '../models/response.model';
import { loginBaseUrl } from './urls.service';
import { Observable } from 'rxjs';
import { HttpOptions } from './http-options.service';

@Injectable({
  providedIn: 'root'
})
export class LoginService {

  constructor(private http: HttpClient,
              private httpOptions: HttpOptions) {}

  login(loginModel: LoginModel): Observable<WrapperResponse> {
    this.httpOptions.httpOptionsLogin.headers = this.httpOptions.httpOptionsLogin.headers.delete('Authorization');
    return this.http.post<WrapperResponse>(loginBaseUrl + '/login', loginModel, this.httpOptions.httpOptionsLogin);
  }

  logout(): Observable<WrapperResponse> {
    this.httpOptions.httpOptionsLogin.headers = this.httpOptions.httpOptionsLogin.headers.delete('Authorization');
    return this.http.post<WrapperResponse>(loginBaseUrl + '/logout', null, this.httpOptions.httpOptionsLogin);
  }

  refreshToken(): Observable<WrapperResponse> {
    const loginModel = new LoginModel();
    loginModel.grant_type = 'refresh_token';
    this.httpOptions.httpOptionsRefresh.headers = this.httpOptions.httpOptionsRefresh.headers.set('refresh_token', localStorage.getItem('refresh_token'));
    return this.http.post<WrapperResponse>(loginBaseUrl + '/refresh', loginModel, this.httpOptions.httpOptionsRefresh);
  }

  recover_password(data: any): Observable<WrapperResponse> {
    this.httpOptions.httpOptionsLogin.headers = this.httpOptions.httpOptionsLogin.headers.delete('Authorization');
    return this.http.post<WrapperResponse>(loginBaseUrl + '/forgot_password', data, this.httpOptions.httpOptionsLogin);
  }

  registrate(data: any): Observable<WrapperResponse> {
    this.httpOptions.httpOptionsLogin.headers = this.httpOptions.httpOptionsLogin.headers.delete('Authorization');
    return this.http.post<WrapperResponse>(loginBaseUrl + '/registrate', data, this.httpOptions.httpOptionsLogin);
  }
}
