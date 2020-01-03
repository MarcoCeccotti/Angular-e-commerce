import { Component, OnInit } from '@angular/core';

import { UserSession } from '../services/user-session.service';
import { Location } from '@angular/common';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(public userSession: UserSession,
                private location: Location) {
                    console.log('SONO QUIIIIIIIIIIIIIIIII');
                }

    ngOnInit(): void {
        console.log(this.userSession.user);
    }

    back() {
        this.location.back();
    }
}
