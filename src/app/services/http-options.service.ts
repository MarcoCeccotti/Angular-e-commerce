import { HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class HttpOptions {

    httpOptionsProducts = {
        headers: new HttpHeaders({
            'Content-Type': 'application/json',
            company_id: 'marcospa'
        })
    };

    httpOptionsLogin = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        api_key: 'marco-client',
        api_secret: 'marco-secret',
        company_id: 'marcospa'
      })
    };

    httpOptionsRefresh = {
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
        api_key: 'marco-client',
        api_secret: 'marco-secret',
        company_id: 'marcospa'
      })
    };
}
