import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { MatInputModule, MatCheckboxModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { SharedModule } from '../shared/shared.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { AccountRoutingModule } from './account-routing.module';
import { RegistrationConfirmComponent } from './registration-confirm/registration-confirm.component';
import { LazyDisplayImgDirective } from './directive/lazy-display-img.directive';
import { ForgotPasswordComponent } from './component/forgot-password/forgot-password.component';
import { ResetPasswordComponent } from './component/reset-password/reset-password.component';
import { PositionTriangleElementDirective } from './directive/position-triangle-element.directive';
import { PositionMenuLangueDirective } from './directive/position-menu-langue.directive';
import { DriveSocialComponent } from './component/drive-social/drive-social.component';

@NgModule({
  declarations: [
    AccountRoutingModule.components,
    RegistrationConfirmComponent,
    LazyDisplayImgDirective,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    PositionTriangleElementDirective,
    PositionMenuLangueDirective,
    DriveSocialComponent
  ],
  imports: [
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    ReactiveFormsModule,
    SharedModule,
    MatCheckboxModule,
    FontAwesomeModule,
    AccountRoutingModule,
    MatMenuModule,
    MatToolbarModule
  ],
  providers: [
  ],
})
export class AccountModule { }
