import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { DriveComponent } from './component/drive/drive.component';
import { DriveRoutingModule } from './drive-routing.module';
import { AlbumsModule } from '../albums/albums.module';
import { AlbumModule } from '../album/album.module';

@NgModule({
  declarations: [DriveComponent],
  imports: [
    CommonModule,
    DriveRoutingModule,
    AlbumsModule,
    AlbumModule
  ]
})
export class DriveModule { }
