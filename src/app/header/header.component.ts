import { Component, OnInit } from '@angular/core';

import * as jwt_decode from 'jwt-decode';
import { LoginService } from '../services/login.service';
import { MessagesService } from '../services/messages.service';
import { HttpOptions } from '../services/http-options.service';
import { Router } from '@angular/router';
// import { HeaderService } from '../services/header.service';
import { UserSession } from '../services/user-session.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

    constructor(private loginService: LoginService,
                private messagesService: MessagesService,
                private httpOptions: HttpOptions,
                public userSession: UserSession,
                public router: Router) {}

    ngOnInit(): void {}

    logout(): void {
        this.loginService.logout()
                       .subscribe(response => {
                          localStorage.removeItem('access_token');
                          localStorage.removeItem('refresh_token');
                          this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.delete('Authorization');
                          this.httpOptions.httpOptionsRefresh.headers = this.httpOptions.httpOptionsRefresh.headers.delete('refresh_token');
                          this.router.navigate(['/login']);
                          this.messagesService.message.message = response.payload;
                       },
                       error => {
                            console.log(error);
                       });
    }

    public getDecodedAccessToken(token: string): any {
        try {
            return jwt_decode(token);
        } catch (Error) {
            return null;
        }
    }
}
