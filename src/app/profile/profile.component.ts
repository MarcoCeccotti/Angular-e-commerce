import { Component, OnInit } from '@angular/core';

import { UserSession } from '../services/user-session.service';

@Component({
    selector: 'app-profile',
    templateUrl: './profile.component.html',
    styleUrls: ['./profile.component.css']
})
export class ProfileComponent implements OnInit {

    constructor(public userSession: UserSession) {}

    ngOnInit(): void {
        console.log(this.userSession.user);
    }
}
