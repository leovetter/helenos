import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './component/home/home.component';
import { SignUpComponent } from './component/sign-up/sign-up.component';
import { RegistrationConfirmComponent } from './registration-confirm/registration-confirm.component';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { DriveSocialComponent } from './component/drive-social/drive-social.component';

const routes: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'sign-up', component: SignUpComponent },
  { path: 'registrationConfirm', component: RegistrationConfirmComponent },
  { path: 'forgot-password', component: ForgotPasswordComponent },
  { path: 'resetPassword', component: ResetPasswordComponent },
  { path: 'drive-social', component: DriveSocialComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AccountRoutingModule {
  static components = [ HomeComponent, SignUpComponent  ];
}
