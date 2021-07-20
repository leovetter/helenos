import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { SharedModule } from '../shared/shared.module';
import { CanActivateAuthGuard } from '../shared/guard/can-activate-auth.guard';
import { SmartAlbumsComponent } from '../albums/component/smart-albums/smart-albums.component';
import { SmartAddAlbumComponent } from '../albums/component/smart-add-album/smart-add-album.component';
import { IsNotDirtyGuard } from '../albums/guard/is-not-dirty.guard';
import { SmartAlbumComponent } from '../album/component/smart-album/smart-album.component';
// import { DriveComponent } from './component/drive/drive.component';

const routes: Routes = [
  { path: '', component: SmartAlbumsComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'album/:idLibrary', component: SmartAlbumComponent, canActivate: [ CanActivateAuthGuard ] },
  { path: 'albums/new', component: SmartAddAlbumComponent, canActivate: [ CanActivateAuthGuard ],
    children: [
      { path: '',  redirectTo: 'info', pathMatch: 'full' },
      { path: 'info', component: SmartAddAlbumComponent }
    ], },
];

@NgModule({
  imports: [
    RouterModule.forChild(routes),
    SharedModule
  ],
  exports: [RouterModule]
})
export class DriveRoutingModule { }
