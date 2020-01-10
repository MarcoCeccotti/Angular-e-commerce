import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserSession {

    public user: any;

    constructor() {
        this.user = JSON.parse(localStorage.getItem('user-session'));
    }
}
