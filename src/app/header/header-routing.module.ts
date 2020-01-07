import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from '../services/auth-guard.service';
import { HeaderComponent } from './header.component';
import { ShoppingCartComponent } from '../shopping-cart/shopping-cart.component';
import { ProfileComponent } from '../profile/profile.component';

const routes: Routes = [
    { path: 'profile', canActivate: [AuthGuard], component: ProfileComponent },
    { path: 'shopping-cart', canActivate: [AuthGuard], component: ShoppingCartComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class HeaderRoutingModule { }
