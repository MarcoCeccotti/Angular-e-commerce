import { NgModule } from '@angular/core';
import { RouterModule, Routes, PreloadAllModules } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RecoverPasswordComponent } from './recover_password/recover-password.component';
import { RegistrateComponent } from './registrate/registrate.component';
import { AuthGuard } from './services/auth-guard.service';
import { ProfileComponent } from './profile/profile.component';
import { ShoppingCartComponent } from './shopping-cart/shopping-cart.component';

// TODO CREARE UN ROUTING MODULE SOLO PER L'HEADER
const routes: Routes = [
    {path: '', redirectTo: '/login', pathMatch: 'full'},
    {path: 'login', component: LoginComponent},
    {path: 'recover-password', component: RecoverPasswordComponent},
    {path: 'registrate', component: RegistrateComponent},
    {path: 'profile', canActivate: [AuthGuard], component: ProfileComponent},
    {path: 'shopping-chart', canActivate: [AuthGuard], component: ShoppingCartComponent},
    {path: 'products', loadChildren: () => import('./navigation-products/navigation-products.module').then(routing => routing.NavigationModule)}
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, {preloadingStrategy: PreloadAllModules})
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
