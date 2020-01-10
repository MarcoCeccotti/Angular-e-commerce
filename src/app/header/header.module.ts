import { NgModule } from '@angular/core';

import { HeaderRoutingModule } from './header-routing.module';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';
import { ProfileComponent } from '../profile/profile.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

import { ProductsService } from '../services/products.service';
import { LoginService } from '../services/login.service';
import { TokenCheckService } from '../services/token-check.service';
import { UserSession } from '../services/user-session.service';
import { HttpOptions } from '../services/http-options.service';
import { AuthGuard } from '../services/auth-guard.service';
import { PurchaseComponent } from '../purchase/purchase.component';
import { CommonModule } from '@angular/common';

@NgModule({
  declarations: [
    HeaderComponent,
    ProfileComponent,
    ShoppingCartComponent,
    PurchaseComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    HeaderRoutingModule
  ],
  providers: [
    ProductsService,
    LoginService,
    TokenCheckService,
    UserSession,
    HttpOptions,
    AuthGuard
  ],
  exports: [
    HeaderComponent,
    ProfileComponent,
    ShoppingCartComponent
  ],
  bootstrap: []
})
export class HeaderModule { }
