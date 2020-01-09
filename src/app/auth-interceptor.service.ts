import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenCheckService } from './services/token-check.service';
import { switchMap } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private tokenCheckService: TokenCheckService) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log('Richiesta intercettata ' + req.url);

        if (req.url.includes('oauth') || (req.url.includes('oauth') && (req.url.includes('user') || req.url.includes('refresh')))) {
            console.log('Richiesta non modificata');
            return next.handle(req);
        }

        console.log('Richiesta probabilmente controllata per controllo token per lo URL ' + req.url);

        return this.tokenCheckService.checkToken()
            .pipe(switchMap(res => {

                console.log('Sto per stampare il token di accesso');
                console.log(localStorage.getItem('access_token'));
                req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));

                return next.handle(req);
            }));

        // return this.tokenCheckService.checkToken().switchMap(user => {
        //     if (user.access_token) {
        //         req = req.clone({ setHeaders: { Authorization: 'Bearer ' + user.access_token } });
        //     }
        //     return next.handle(req);
        // }

        // this.tokenCheckService.checkToken()
        //     .pipe(res => {
        //         console.log('Sto per stampare il token di accesso');
        //         console.log(localStorage.getItem('access_token'));
        //         req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
        //         // const modifiedRequest = req.clone({
        //         //     headers: req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'))
        //         // });
        //         return next.handle(req);
        //     });

        // return next.handle(req);
    }
}
