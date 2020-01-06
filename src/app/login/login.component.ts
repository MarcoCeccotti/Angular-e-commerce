import { Component, OnInit, ViewChild, ViewEncapsulation } from '@angular/core';

import { LoginService } from '../services/login.service';
import { Router } from '@angular/router';
import { HttpOptions } from '../services/http-options.service';

import { MessagesComponent } from '../messages/messages.component';
import { MessagesService } from '../services/messages.service';
import { NgForm } from '@angular/forms';
import { TokenDecoderService } from '../services/token-decoder.service';
import { UserService } from '../services/user.service';
import { UserSession } from '../services/user-session.service';
import { tap, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class LoginComponent implements OnInit {

  @ViewChild('f', {static: false})
  private form: NgForm;

  messages: MessagesComponent;

  constructor(private userSession: UserSession,
              private loginService: LoginService,
              private userService: UserService,
              private messagesService: MessagesService,
              private tokenDecoderService: TokenDecoderService,
              private router: Router,
              private httpOptions: HttpOptions) {}

  ngOnInit(): void {
    if (localStorage.getItem('access_token')) {
      this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + localStorage.getItem('access_token'));
    }
  }

  onSubmit(): void {
    this.form.value.grant_type = 'password';
    this.loginService.login(this.form.value)
      .pipe(
        tap((response) => {
          localStorage.setItem('access_token', response.payload.access_token);
          localStorage.setItem('refresh_token', response.payload.refresh_token);
          console.log(response.payload.access_token);
          this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + response.payload.access_token);
          this.httpOptions.httpOptionsRefresh.headers = this.httpOptions.httpOptionsRefresh.headers.set('refresh_token', response.payload.refresh_token);
          this.messagesService.message.message = 'Utente ' + this.form.value.username + ' connesso con successo';
          this.messagesService.message.type = 'success';
        }),
        switchMap((response) => {
          // Terminato il login lancio questa chiamata alla user service.
          const tokenInfo = this.tokenDecoderService.getDecodedAccessToken(response.payload.access_token);
          return this.userService.userInfo(tokenInfo.sub);
        })
      ).subscribe(responseUser => {
        this.userSession.user = responseUser.payload;
        localStorage.setItem('user-session', JSON.stringify(responseUser.payload));
        // Soltanto adesso fai la navigazione alla nuova pagina.
        this.router.navigate(['/products']);
      },
      error => {
        console.log(error.error);
        this.messagesService.message.message = error.error.outcome.message;
        this.messagesService.message.type = 'alert';
      });
  }

      /*
      this.loginService.login(this.form.value)
                     .subscribe(response => {
                        localStorage.setItem('access_token', response.payload.access_token);
                        localStorage.setItem('refresh_token', response.payload.refresh_token);
                        console.log(response.payload.access_token);
                        this.httpOptions.httpOptionsProducts.headers = this.httpOptions.httpOptionsProducts.headers.set('Authorization', 'Bearer ' + response.payload.access_token);
                        this.httpOptions.httpOptionsRefresh.headers = this.httpOptions.httpOptionsRefresh.headers.set('refresh_token', response.payload.refresh_token);
                        this.router.navigate(['/products']);
                        this.messagesService.message.message = 'Utente ' + this.form.value.username + ' connesso con successo';
                        this.messagesService.message.type = 'success';

                        const tokenInfo = this.tokenDecoderService.getDecodedAccessToken(response.payload.access_token);
                        this.userService.userInfo(tokenInfo.sub)
                                        .subscribe(responseUser => {
                                          this.userSession.user = responseUser.payload;
                                          localStorage.setItem('user-session', JSON.stringify(responseUser.payload));
                                        },
                                        error => {
                                          console.log(error.error);
                                          this.messagesService.message.message = error.error.outcome.message;
                                          this.messagesService.message.type = 'alert';
                                        });
                     },
                     error => {
                       console.log(error.error);
                       this.messagesService.message.message = error.error.outcome.message;
                       this.messagesService.message.type = 'alert';
                     }
    );
      */
}
