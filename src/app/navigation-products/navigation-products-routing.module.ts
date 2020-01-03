import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { NavigationProductsComponent } from './navigation-products.component';
import { AuthGuard } from '../services/auth-guard.service';
import { RoleGuard } from '../services/role-guard.service';

const routes: Routes = [
    {
      path: '',
      canActivate: [AuthGuard, RoleGuard],
      component: NavigationProductsComponent,
      data: {
        roles: ['ROLE_ADM']
      }
    },
    {path: ':id', canActivate: [AuthGuard], component: NavigationProductsComponent},
    {path: '**', redirectTo: '/products'}
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class NavigationRoutingModule { }
