import { NgModule } from '@angular/core';
import { ReactiveFormsModule } from '@angular/forms';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { AccountComponent } from './component/account/account.component';
import { TranslateModule } from '@ngx-translate/core';
import { SharedModule } from '../shared/shared.module';
import { MatFormFieldModule, MatInputModule, MatButtonModule } from '@angular/material';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { UserEffects } from './state/user.effects';
// import { reducer } from './state/user.reducer';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    AccountComponent,
    UserRoutingModule.components
  ],
  imports: [
    // StoreModule.forFeature('users', reducer),
    EffectsModule.forFeature(
      [ UserEffects ]
    ),
    ReactiveFormsModule,
    TranslateModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    UserRoutingModule,
    SharedModule
  ],
  providers: [
    CanActivateAuthGuard,
  ]
})
export class UserModule { }
