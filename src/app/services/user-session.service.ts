import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root',
})
export class UserSession {

    public user: any;

    constructor() {

        // TODO PER OTTENERE IL CODICE 'ROTTO' COMMENTA QUESTA RIGA DI CODICE SOTTO
        this.user = JSON.parse(localStorage.getItem('user-session'));
    }
}
