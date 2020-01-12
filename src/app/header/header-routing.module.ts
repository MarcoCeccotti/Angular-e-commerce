import { NgModule } from '@angular/core';

import { RouterModule, Routes } from '@angular/router';

import { AuthGuard } from '../services/auth-guard.service';

import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProfileComponent } from '../profile/profile.component';
import { PurchaseComponent } from '../purchase/purchase.component';

const routes: Routes = [
    { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
    { path: 'purchase', canActivate: [AuthGuard], component: PurchaseComponent },
    { path: 'shopping-cart', canActivate: [AuthGuard], component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule {}
