import { NgModule, ModuleWithProviders } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { SecuredMediaComponent } from './component/secured-media/secured-media.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormatSrcPipe } from './pipe/format-src.pipe';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { SharedEffects } from './state/shared.effects';
import { reducer } from './state/shared.reducer';
import { PlayerComponent } from './component/player/player.component';
import { SmartPlayerComponent } from './component/smart-player/smart-player.component';
import { PopupComponent } from './component/popup/popup.component';
import { LoginComponent } from './component/login/login.component';
import { NavbarComponent } from './component/navbar/navbar.component';
import { FooterComponent } from './component/footer/footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatCheckboxModule, MatInputModule, MatMenuModule, MatToolbarModule } from '@angular/material';
import { RouterModule } from '@angular/router';
import { DisplayHideLoginComponentDirective } from './directive/display-hide-login-component.directive';
import { LazyLoadingMediasDirective } from './directive/lazy-loading-medias.directive';
import { CanActivateAuthGuard } from './guard/can-activate-auth.guard';

@NgModule({
  declarations: [
    SecuredMediaComponent,
    FormatSrcPipe,
    PlayerComponent,
    SmartPlayerComponent,
    PopupComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    DisplayHideLoginComponentDirective,
    LazyLoadingMediasDirective,
  ],
  imports: [
    CommonModule,
    FormsModule,
    MatToolbarModule,
    RouterModule,
    MatInputModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    MatCheckboxModule,
    FontAwesomeModule,
    MatMenuModule,
    TranslateModule,
    StoreModule.forFeature('shared', reducer),
    EffectsModule.forFeature(
      [ SharedEffects ]
    ),
  ],
  exports: [
    CommonModule,
    TranslateModule,
    SecuredMediaComponent,
    FormatSrcPipe,
    SmartPlayerComponent,
    PopupComponent,
    LoginComponent,
    NavbarComponent,
    FooterComponent,
    LazyLoadingMediasDirective,
  ],
  providers: [
    CanActivateAuthGuard
  ]
})
export class SharedModule {
  static forRoot(): ModuleWithProviders {
    return {
      ngModule: SharedModule,
      providers: [],
    };
  }
}
