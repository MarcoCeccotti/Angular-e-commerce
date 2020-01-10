import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { FormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';

import { ProductsService } from './services/products.service';
import { LoginService } from './services/login.service';
import { AuthGuard } from './services/auth-guard.service';
import { HttpOptions } from './services/http-options.service';
import { TokenCheckService } from './services/token-check.service';
import { MessagesService } from './services/messages.service';
import { RoleGuard } from './services/role-guard.service';
import { RecoverPasswordComponent } from './recover_password/recover-password.component';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { FooterComponent } from './footer/footer.component';
import { UserSession } from './services/user-session.service';
import { AuthInterceptorService } from './auth-interceptor.service';
import { HeaderRoutingModule } from './header/header-routing.module';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RecoverPasswordComponent,
    ConfirmDialogComponent,
    FooterComponent,
    RegistrateComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    FormsModule,
    AppRoutingModule
  ],
  entryComponents: [
    ConfirmDialogComponent
  ],
  providers: [
    ProductsService,
    LoginService,
    TokenCheckService,
    MessagesService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptorService,
      multi: true
    },
    UserSession,
    HttpOptions,
    AuthGuard,
    RoleGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
