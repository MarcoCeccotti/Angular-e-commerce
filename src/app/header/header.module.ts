import { NgModule } from '@angular/core';

import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';

import { HeaderComponent } from './header.component';
import { ProfileComponent } from '../profile/profile.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';

import { PurchaseComponent } from '../purchase/purchase.component';
import { CommonModule } from '@angular/common';
import { HeaderRoutingModule } from './header-routing.module';
import { RouterModule } from '@angular/router';

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
    RouterModule,
    HeaderRoutingModule
  ],
  providers: [],
  exports: [
    HeaderComponent,
    ProfileComponent,
    ShoppingCartComponent
  ],
  bootstrap: []
})
export class HeaderModule { }
