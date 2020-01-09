import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { LoginService } from './login.service';
import { HttpOptions } from './http-options.service';
import { Router } from '@angular/router';

import { switchMap, tap } from 'rxjs/operators';
import { WrapperResponse } from '../models/response.model';
import { TokenDecoderService } from './token-decoder.service';

@Injectable()
export class TokenCheckService {

    constructor(private loginService: LoginService,
                private tokenDecoderService: TokenDecoderService,
                private httpOptions: HttpOptions,
                private router: Router) {}

    checkToken(): Observable<any> {

        if (localStorage.getItem('access_token')) {
            let tokenInfo = this.tokenDecoderService.getDecodedAccessToken(localStorage.getItem('access_token')); // decodifica token di accesso

            if (tokenInfo) {
                const now = Date.now();

                console.log('TOKEN EXPIRE = ' + (now - tokenInfo.exp * 1000 > -45000));
                if (now - tokenInfo.exp * 1000 < -45000) {
                    return of(true);

                } else {

                    console.log('STO REFRESHANDO ACCESS TOKEN');
                    tokenInfo = this.tokenDecoderService.getDecodedAccessToken(localStorage.getItem('refresh_token')); // decodifica token di refresh

                    if (now >= tokenInfo.exp * 1000) { // anche il refresh token è scaduto, si riparte dal login
                        this.router.navigate(['/login']);
                        return of(false);
                    }

                    return this.loginService.refreshToken()
                        .pipe(
                            tap((response: WrapperResponse) => {
                                localStorage.setItem('access_token', response.payload.access_token);
                                localStorage.setItem('refresh_token', response.payload.refresh_token);
                                this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + response.payload.access_token);
                                console.log('REFRESHED ACCESS TOKEN = ' + localStorage.getItem('access_token'));
                                console.log('REFRESHED REFRESH TOKEN = ' + localStorage.getItem('refresh_token'));
                            },
                            switchMap(() => of(true)))
                        );
                }
            }

        } else {

            this.router.navigate(['/login']);
            return of(false);
        }
    }
}
