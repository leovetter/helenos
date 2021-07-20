import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ProfileRoutingModule } from './profile-routing.module';
import { ProfileComponent } from './component/profile/profile.component';
import { SmartProfileComponent } from './component/smart-profile/smart-profile.component';
import { SmartProfilePersonComponent } from './component/smart-profile-person/smart-profile-person.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { SharedModule } from '../shared/shared.module';
import { AlbumsModule } from '../albums/albums.module';
import { StoreModule } from '@ngrx/store';
import { EffectsModule } from '@ngrx/effects';
import { ProfileEffects } from './state/profile.effects';
import { reducer } from './state/profile.reducer';
import { AboutComponent } from '../profile/component/about/about.component';
import { SmartAboutComponent } from '../profile/component/smart-about/smart-about.component';
import { SmartPersonAboutComponent } from '../profile/component/smart-person-about/smart-person-about.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { OnLoadingAboutSectionDirective } from './directive/on-loading-about-section.directive';
import { ResetFirstNameDirective } from './directive/reset-first-name.directive';
import { ResetLastNameDirective } from './directive/reset-last-name.directive';
import { SettingsComponent } from './component/settings/settings.component';
import { AssistanceComponent } from './component/assistance/assistance.component';
import { MatFormFieldModule, MatInputModule } from '@angular/material';

@NgModule({
  declarations: [
    ProfileComponent, 
    SmartProfileComponent,
    SmartProfilePersonComponent,
    AboutComponent,
    SmartAboutComponent,
    SmartPersonAboutComponent,
    OnLoadingAboutSectionDirective,
    ResetFirstNameDirective,
    ResetLastNameDirective,
    SettingsComponent,
    AssistanceComponent
  ],
  imports: [
    StoreModule.forFeature('profile', reducer),
    EffectsModule.forFeature(
      [ ProfileEffects ]
    ),
    CommonModule,
    ProfileRoutingModule,
    FontAwesomeModule,
    SharedModule,
    AlbumsModule,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
  ]
})
export class ProfileModule { }
