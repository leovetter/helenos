import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { StoreModule } from '@ngrx/store';
import { reducer } from './state/media.reducer';
import { EffectsModule } from '@ngrx/effects';
import { MediaEffects } from './state/media.effects';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MediaRoutingModule } from './media-routing.module';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';

@NgModule({
  declarations: [ 
    MediaRoutingModule.components,
  ],
  imports: [
    CommonModule,
    SharedModule,
    FormsModule,
    FontAwesomeModule,
    StoreModule.forFeature('medias', reducer),
    EffectsModule.forFeature(
      [ MediaEffects ]
    ),
    MatFormFieldModule,
    ReactiveFormsModule,
    MatInputModule,
    MatButtonModule,
    MediaRoutingModule
  ],
})
export class MediaModule { }
