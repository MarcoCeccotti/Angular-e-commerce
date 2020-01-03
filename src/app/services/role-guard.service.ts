import { CanActivate, ActivatedRouteSnapshot } from '@angular/router';
import { Injectable } from '@angular/core';
import * as jwt_decode from 'jwt-decode';
import { Observable } from 'rxjs';

@Injectable()
export class RoleGuard implements CanActivate {

    constructor() {}

    canActivate(route: ActivatedRouteSnapshot): Observable<boolean> | boolean {

        const tokenInfo = this.getDecodedAccessToken(localStorage.getItem('access_token')); // decodifica token di accesso

        return route.data && tokenInfo.authorities.some((role: string) => route.data.roles.some((roleRoute: string) => role === roleRoute));
    }

    getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
