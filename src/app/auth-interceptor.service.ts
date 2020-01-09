import { Injectable } from '@angular/core';
import { HttpInterceptor, HttpRequest, HttpHandler } from '@angular/common/http';
import { TokenCheckService } from './services/token-check.service';
import { switchMap, catchError } from 'rxjs/operators';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptorService implements HttpInterceptor {

    constructor(private tokenCheckService: TokenCheckService,
                private router: Router) {}

    intercept(req: HttpRequest<any>, next: HttpHandler) {

        console.log('Richiesta intercettata ' + req.url);

        if (req.url.includes('oauth') || (req.url.includes('oauth') && (req.url.includes('user') || req.url.includes('refresh')))) {
            return next.handle(req);
        }

        return this.tokenCheckService.checkToken()
            .pipe(
                switchMap(res => {
                    if (res) {
                        req.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
                        return next.handle(req);
                    } else {
                        this.router.navigate(['/login']);
                    }
                })
        );
    }
}
