import { NgModule } from '@angular/core';
import { AlbumsComponent } from './component/albums/albums.component';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { MatCardModule, MatListModule, MatInputModule, MatCheckboxModule } from '@angular/material';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatButtonModule } from '@angular/material/button';
import { AddAlbumComponent } from './component/add-album/add-album.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DragNDropDirective } from './directive/drag-n-drop.directive';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { AddUsersAlbumComponent } from './component/add-users-album/add-users-album.component';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { SharedModule } from '../shared/shared.module';
import { reducer } from './state/albums.reducer';
import { StoreModule } from '@ngrx/store';
import { AlbumsEffects } from './state/albums.effects';
import { EffectsModule } from '@ngrx/effects';
import { AlbumsRoutingModule } from './albums-routing.module';
import { EditAlbumComponent } from './component/edit-album/edit-album.component';
import { SmartEditAlbumComponent } from './component/smart-edit-album/smart-edit-album.component';
import { MediaModule } from '../media/media.module';
import { MatSelectModule } from '@angular/material/select';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { MatDialogModule } from '@angular/material/dialog';
import { PopupCheckoutComponent } from './component/popup-checkout/popup-checkout.component';
import { DeleteAlbumComponent } from './component/delete-album/delete-album.component';
import { FormatCoverPipe } from './pipe/format-cover.pipe';
import { SmartAlbumsComponent } from './component/smart-albums/smart-albums.component';

@NgModule({
  declarations: [
    AlbumsRoutingModule.components,
    AlbumsComponent,
    AddAlbumComponent,
    DragNDropDirective,
    AddUsersAlbumComponent,
    EditAlbumComponent,
    SmartEditAlbumComponent,
    PopupCheckoutComponent,
    DeleteAlbumComponent,
    FormatCoverPipe,
  ],
  imports: [
    StoreModule.forFeature('albums', reducer),
    EffectsModule.forFeature(
      [ AlbumsEffects ]
    ),
    MatCardModule,
    MatDialogModule,
    MatListModule,
    MatGridListModule,
    MatButtonModule,
    MatInputModule,
    ReactiveFormsModule,
    NgbModule,
    MatAutocompleteModule,
    SharedModule,
    AlbumsRoutingModule,
    MediaModule,
    MatSelectModule,
    MatCheckboxModule,
    FontAwesomeModule,
    FormsModule
  ],
  exports: [
    SmartAlbumsComponent
  ],
  providers: [
    CanActivateAuthGuard,
  ],
})
export class AlbumsModule { }
