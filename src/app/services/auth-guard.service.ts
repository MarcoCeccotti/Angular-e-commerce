import { CanActivate } from '@angular/router';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { TokenCheckService } from './token-check.service';
import { switchMap } from 'rxjs/operators';

@Injectable()
export class AuthGuard implements CanActivate {

    constructor(private tokenCheckService: TokenCheckService) {}

    canActivate(): Observable<boolean> {
        // return this.tokenCheckService.checkToken()
        //     .pipe(switchMap(res => {
        //         return of(true);
        //     }));
        return of(true);
    }
}
