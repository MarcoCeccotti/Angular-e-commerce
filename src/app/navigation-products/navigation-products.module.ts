import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import {NgbModule} from '@ng-bootstrap/ng-bootstrap';

import { ProductsListComponent } from '../products/products-list/products-list.component';
import { ProductsDetailComponent } from '../products/products-detail/products-detail.component';

import { ProductsService } from '../services/products.service';
import { NavigationProductsComponent } from './navigation-products.component';
import { NavigationProductsService } from '../services/navigation-products.service';
import { HttpOptions } from '../services/http-options.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { NavigationRoutingModule } from './navigation-products-routing.module';
import { HeaderModule } from '../header/header.module';

@NgModule({
  declarations: [
    ProductsListComponent,
    ProductsDetailComponent,
    NavigationProductsComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    RouterModule,
    NgbModule,
    HeaderModule,
    NavigationRoutingModule
  ],
  exports: [
    ProductsListComponent,
    ProductsDetailComponent,
    NavigationProductsComponent
  ],
  providers: [
    ProductsService,
    NavigationProductsService,
    HttpOptions
  ],
  bootstrap: []
})
export class NavigationModule { }
