import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AlbumRoutingModule } from './album-routing.module';
import { AlbumComponent } from './component/album/album.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatAutocompleteModule, MatButtonModule, MatCardModule, MatGridListModule, MatInputModule, MatListModule, MatSelectModule } from '@angular/material';
import { SharedModule } from '../shared/shared.module';
import { SmartEditMediaComponent } from './component/smart-edit-media/smart-edit-media.component';
import { DeleteMediaComponent } from './component/delete-media/popup-delete-media.component';
import { AddSharedUsersComponent } from './component/add-shared-users/add-shared-users.component';
import { AddMediasComponent } from './component/add-medias/add-medias.component';
import { EditMediaComponent } from './component/edit-media/edit-media.component';
import { MediaCommentsComponent } from './component/media-comments/media-comments.component';
import { SmartMediaCommentsComponent } from './component/smart-media-comments/smart-media-comments.component';
import { ImageEditorComponent } from './component/image-editor/image-editor.component';
import { SmartImageEditorComponent } from './smart-image-editor/smart-image-editor.component';
import {CloudinaryModule, CloudinaryConfiguration, provideCloudinary} from '@cloudinary/angular-5.x';
import * as  Cloudinary from 'cloudinary-core';
import { CropDirective } from './directive/crop.directive';
import { CropSecondDirective } from './directive/crop-second.directive';

@NgModule({
  declarations: [
    AlbumRoutingModule.components,
    AlbumComponent,
    SmartEditMediaComponent,
    DeleteMediaComponent,
    AddSharedUsersComponent,
    AddMediasComponent,
    EditMediaComponent,
    MediaCommentsComponent,
    SmartMediaCommentsComponent,
    ImageEditorComponent,
    SmartImageEditorComponent,
    CropDirective,
    CropSecondDirective
  ],
  imports: [
    CommonModule,
    AlbumRoutingModule,
    FontAwesomeModule,
    ReactiveFormsModule,
    TranslateModule,
    MatInputModule,
    MatSelectModule,
    MatGridListModule,
    MatCardModule,
    SharedModule,
    FormsModule,
    MatAutocompleteModule,
    MatListModule,
    MatButtonModule,
    CloudinaryModule.forRoot(Cloudinary, { cloud_name: 'helenos'}),
  ]
})
export class AlbumModule { }
