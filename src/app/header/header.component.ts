import { Component, OnInit } from '@angular/core';

import { LoginService } from '../services/login.service';
import { MessagesService } from '../services/messages.service';
import { HttpOptions } from '../services/http-options.service';
import { Router } from '@angular/router';
import { UserSession } from '../services/user-session.service';
import { Location } from '@angular/common';

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
                private location: Location,
                public router: Router) {
                  console.log(userSession.user.image_path);
                }

    ngOnInit(): void {}

    public logout(): void {
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

    public back(): void {
      this.location.back();
    }
}
