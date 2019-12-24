import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import {HomeComponent} from './home/home.component';
import {LoginComponent} from './login/login.component';
import {ForgotPasswordComponent} from './forgot-password/forgot-password.component';
import {AccountComponent} from './account/account.component';
import {ProfileComponent} from "./profile/profile.component";
import {RecipientComponent} from "./recipient/recipient.component";
import {TransferComponent} from "./transfer/transfer.component";


const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full'},
  { path: 'login', component: LoginComponent },
  { path: 'home', component: HomeComponent },
  { path: 'forgot_password/:token', component: ForgotPasswordComponent },
  { path: 'account/:id', component: AccountComponent },
  { path: 'recipients', component: RecipientComponent },
  { path: 'transfer', component: TransferComponent },
  { path: 'profile', component: ProfileComponent },
  {
    path: 'purchases',
    loadChildren: './purchases/purchases.module#PurchasesModule',
    /*canActivate: [AdminGuard ,UserGuard ],*/
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
